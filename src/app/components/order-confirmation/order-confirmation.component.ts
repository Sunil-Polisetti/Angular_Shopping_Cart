import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';


@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

  order: any = null;
  currentDateTime: Date = new Date();
  loading = true;
  error = '';
  confirmationDate: Date = new Date();
  confirmationTime: string | undefined;

  constructor(private router: Router, private orderService: OrderService) {}
  

  /* ================= INIT ================= */

  ngOnInit(): void {
    this.currentDateTime = new Date();  // Always show current date/time
    this.loadOrder();
    this.confirmationTime = this.formatTime(new Date());
  }

  /* ================= LOAD ORDER ================= */

  private loadOrder(): void {
    const storedOrder = JSON.parse(localStorage.getItem('lastOrder') || 'null') || this.orderService.getCurrentOrder();
    if (storedOrder) {
      this.order = storedOrder;
      this.loading = false;
      return;
    }

    const lastOrderId = this.orderService.getLastOrderId();
    if (!lastOrderId) {
      this.error = 'No order found';
      this.loading = false;
      return;
    }

    this.orderService.getOrderDetails(lastOrderId).subscribe(
      (response: any) => {
        this.order = response.order;
        this.loading = false;
        // After: localStorage.setItem('lastOrder', JSON.stringify(order));
        // Add these:
        this.orderService.setCurrentOrder(this.order);
        localStorage.setItem('lastOrder', JSON.stringify(this.order));
        localStorage.setItem('lastOrderId', this.order._id);
        // Also save to order history
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        existingOrders.push(this.order);
        localStorage.setItem('orders', JSON.stringify(existingOrders));
        // Clear the cart
        this.orderService.clearCart();
      },
      () => {
        this.error = 'Failed to load order';
        this.loading = false;
      }
    );
  }

  /* ================= INVOICE ================= */

  downloadInvoice(): void {
    if (!this.order) return;

    const html = this.generateInvoiceHTML();
    const element = document.createElement('a');

    element.setAttribute(
      'href',
      'data:text/html;charset=utf-8,' + encodeURIComponent(html)
    );
    element.setAttribute(
      'download',
      `Invoice-${this.order.orderNumber}.html`
    );

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  private generateInvoiceHTML(): string {
    const items = this.order.items
      .map(
        (item: any) => `
          <tr>
            <td>${item.productName || item.name}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price}</td>
            <td>₹${item.price * item.quantity}</td>
          </tr>
        `
      )
      .join('');

    return `
      <html>
        <head>
          <title>Invoice - ${this.order.orderNumber}</title>
          <style>
            body { font-family: Arial; padding: 40px; }
            h1 { color: #1e40af; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 10px; }
            th { background: #1e40af; color: white; }
            .total { text-align: right; font-weight: bold; font-size: 18px; }
          </style>
        </head>
        <body>
          <h1>Invoice</h1>
          <p><strong>Order Number:</strong> ${this.order.orderNumber}</p>
          <p><strong>Date:</strong> ${new Date(this.order.createdAt).toLocaleString()}</p>
          <p><strong>Payment:</strong> ${this.order.paymentMethod}</p>

          <h3>Delivery Address</h3>
          <p>
            ${this.order.address.firstName} ${this.order.address.lastName}<br>
            ${this.order.address.address}<br>
            ${this.order.address.city}, ${this.order.address.state} - ${this.order.address.pincode}<br>
            Phone: ${this.order.address.phone}
          </p>

          <h3>Items</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${items}
            </tbody>
          </table>

          <p class="total">
          Grand Total: ₹${this.order.priceBreakdown?.totalAmount ?? this.order.total ?? 0}
          </p>
        </body>
      </html>
    `;
  }

  /* ================= NAVIGATION ================= */

  continueShopping(): void {
    this.router.navigate(['/']);
  }

  trackOrder(): void {
    alert('Order tracking is not enabled yet');
    this.router.navigate(['/']);
  }

  /* ================= CONFIRMATION ================= */

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
}

