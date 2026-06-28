import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit {
  orders: any[] = [];
  selectedOrder: any = null;
  loading = true;
  error = '';
  user: any = null;
  cancelReason = '';
  showCancelForm = false;

  statusInfo: any = {
    pending: { icon: '⏳', label: 'Order Pending', color: '#f59e0b' },
    confirmed: { icon: '✓', label: 'Order Confirmed', color: '#3b82f6' },
    processing: { icon: '🔄', label: 'Processing', color: '#6366f1' },
    shipped: { icon: '📦', label: 'Shipped', color: '#8b5cf6' },
    delivered: { icon: '✓✓', label: 'Delivered', color: '#22c55e' },
    cancelled: { icon: '✗', label: 'Cancelled', color: '#ef4444' },
  };

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private authService: AuthService,
    public router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.user = this.authService.getCurrentUser();
    this.loadOrders();

    this.route.params.subscribe((params) => {
      if (params['orderId']) {
        this.selectOrder(params['orderId']);
      }
    });
  }

  private loadOrdersFromLocalStorage(): any[] {
    const stored = localStorage.getItem('orders');
    if (!stored) return [];

    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  private mergeOrders(remote: any[], local: any[]): any[] {
    const seen = new Set<string>();
    const merged: any[] = [];

    const add = (order: any) => {
      if (!order) return;
      order._id = order._id || order.orderNumber || '';
      const id = order._id;
      if (!id || seen.has(id)) return;
      seen.add(id);
      merged.push(order);
    };

    (remote || []).forEach(add);
    (local || []).forEach(add);

    return merged.sort((a, b) => {
      const da = new Date(a.createdAt).getTime();
      const db = new Date(b.createdAt).getTime();
      return db - da;
    });
  }

  loadOrders(): void {
    this.orderService.getUserOrders().subscribe(
      (response: any) => {
        const remoteOrders = Array.isArray(response.orders) ? response.orders : [];
        const localOrders = this.loadOrdersFromLocalStorage();
        this.orders = this.mergeOrders(remoteOrders, localOrders);
        this.loading = false;
        if (this.orders.length === 0) {
          this.error = 'No orders found';
        }
      },
      (error) => {
        console.error('Error loading orders:', error);
        this.orders = this.loadOrdersFromLocalStorage();
        this.error = this.orders.length === 0 ? 'Failed to load orders' : '';
        this.loading = false;
      }
    );
  }


  selectOrder(orderId: string): void {
    if (!orderId) return;

    const localOrder = this.orders.find(
      (o) => o._id === orderId || o.orderNumber === orderId
    );

    if (localOrder) {
      this.selectedOrder = localOrder;
      this.showCancelForm = false;
    }

    this.orderService.getOrderDetails(orderId).subscribe(
      (response: any) => {
        if (response?.order) {
          this.selectedOrder = response.order;
        }
        this.showCancelForm = false;
      },
      (error) => {
        console.error('Error loading order details:', error);
      }
    );
  }

  getStatusInfo(status: string): any {
    return this.statusInfo[status] || this.statusInfo['pending'];
  }

  canCancelOrder(): boolean {
    if (!this.selectedOrder) return false;
    return (
      this.selectedOrder.orderStatus === 'pending' ||
      this.selectedOrder.orderStatus === 'confirmed'
    );
  }

  openCancelForm(): void {
    this.showCancelForm = true;
  }

  submitCancel(): void {
    if (!this.cancelReason.trim()) {
      this.toastService.error('Please provide a cancellation reason');
      return;
    }

    this.orderService.cancelOrder(this.selectedOrder._id, this.cancelReason).subscribe(
      (response: any) => {
        this.toastService.success('Order cancelled successfully');
        this.selectedOrder = response.order;
        this.showCancelForm = false;
        this.cancelReason = '';
        this.loadOrders();
      },
      (error) => {
        console.error('Error cancelling order:', error);
        this.toastService.error('Failed to cancel order');
      }
    );
  }

  closeCancelForm(): void {
    this.showCancelForm = false;
    this.cancelReason = '';
  }

  downloadInvoice(order: any): void {
    const content = this.generateInvoiceHTML(order);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `Invoice-${order.orderNumber}.html`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  private generateInvoiceHTML(order: any): string {
    const items = order.items
      .map(
        (item: any) =>
          `<tr>
        <td>${item.productName}</td>
        <td>${item.quantity}</td>
        <td>₹${item.price.toFixed(2)}</td>
        <td>₹${(item.price * item.quantity).toFixed(2)}</td>
      </tr>`
      )
      .join('');

    return `
      <html>
        <head>
          <title>Invoice - ${order.orderNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .order-info { margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
            th { background-color: #1e40af; color: white; }
            .total { text-align: right; margin-top: 20px; font-size: 18px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Invoice</h1>
            <p>Order #${order.orderNumber}</p>
          </div>
          
          <div class="order-info">
            <h3>Order Details</h3>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
            <p><strong>Status:</strong> ${order.orderStatus}</p>
          </div>

          <div class="order-info">
            <h3>Delivery Address</h3>
            <p>${order.deliveryAddress.firstName} ${order.deliveryAddress.lastName}</p>
            <p>${order.deliveryAddress.address}</p>
            <p>${order.deliveryAddress.city}, ${order.deliveryAddress.state} ${order.deliveryAddress.pincode}</p>
            <p>Phone: ${order.deliveryAddress.phone}</p>
          </div>

          <h3>Items</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${items}
            </tbody>
          </table>

          <div class="order-info">
            <h3>Price Breakdown</h3>
            <p>Subtotal: ₹${order.priceBreakdown.subtotal.toFixed(2)}</p>
            <p>Discount: -₹${order.priceBreakdown.discount.toFixed(2)}</p>
            <p>Tax (18%): ₹${order.priceBreakdown.tax.toFixed(2)}</p>
            <p class="total">Total: ₹${order.priceBreakdown.totalAmount.toFixed(2)}</p>
          </div>
        </body>
      </html>
    `;
  }
}
