import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { ToastService } from '../../services/toast.service';
import { Observable, Subject } from 'rxjs';
import { of } from 'rxjs';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  discount: number;
}

interface UserData {
  _id?: string;
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  cartItems: CartItem[] = [];
  subtotal = 0;
  discount = 0;
  tax = 0;
  total = 0;

  user: UserData = {};

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  };

  orderPlaced = false;
  orderNumber = '';
  isProcessing = false;
  showError = false;
  errorMessage = '';
  acceptedTerms = false; // user must accept terms to place order

  private destroy$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router,
    private toastService: ToastService
  ) {}

  /* ================= LIFECYCLE ================= */

  ngOnInit(): void {
    this.initializeCheckout();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /* ================= INIT ================= */

  private initializeCheckout(): void {
    const userData = localStorage.getItem('currentUser');

    if (!userData) {
      this.router.navigate(['/login']);
      return;
    }

    this.user = JSON.parse(userData);
    this.populateUserForm();
    this.loadCart();
  }

  private populateUserForm(): void {
    const nameParts = (this.user?.name || '').split(' ');
    this.formData.firstName = nameParts[0] || '';
    this.formData.lastName = nameParts.slice(1).join(' ');
    this.formData.email = this.user?.email || '';
    this.formData.phone = this.user?.phone || '';
    this.formData.address = this.user?.address || '';
  }

  /* ================= CART ================= */

  private loadCart(): void {
    this.cartItems = this.cartService.getCart();

    if (!this.cartItems.length) {
      this.showError = true;
      this.errorMessage = 'Your cart is empty';
      setTimeout(() => this.router.navigate(['/']), 2000);
      return;
    }

    this.calculatePrices();
  }

  private calculatePrices(): void {
    this.subtotal = 0;
    this.discount = 0;

    this.cartItems.forEach(item => {
      const itemTotal = item.price * item.quantity;
      const itemDiscount = (itemTotal * item.discount) / 100;
      this.subtotal += itemTotal;
      this.discount += itemDiscount;
    });

    this.tax = Math.round((this.subtotal - this.discount) * 0.18);
    this.total = this.subtotal - this.discount + this.tax;
  }

  /* ================= ORDER ================= */

  placeOrder(): void {
    if (!this.isFormValid()) {
      this.showError = true;
      this.errorMessage = 'Please fill all required fields';
      this.toastService.error(this.errorMessage);
      return;
    }

    this.isProcessing = true;

    const deliveryAddress = {
      firstName: this.formData.firstName,
      lastName: this.formData.lastName,
      address: this.formData.address,
      city: this.formData.city,
      state: this.formData.state,
      pincode: this.formData.pincode,
      phone: this.formData.phone
    };

    const priceBreakdown = {
      subtotal: this.subtotal,
      discount: this.discount,
      tax: this.tax,
      totalAmount: this.total
    };

    const items = this.cartItems.map(item => ({
      product: item._id, // Map _id to product for MongoDB ref
      productName: item.name,
      quantity: item.quantity,
      price: item.price,
      discount: item.discount
    }));

    const orderData: any = {
      userId: this.user?._id,
      paymentMethod: 'Cash on Delivery',
      deliveryAddress,
      priceBreakdown,
      items
    };

    this.orderService.placeOrder(orderData).subscribe({
      next: (response: any) => {
        this.isProcessing = false;
        if (response.success && response.order) {
          const savedOrder = response.order;
          localStorage.setItem('lastOrder', JSON.stringify(savedOrder));
          localStorage.setItem('lastOrderId', savedOrder._id);

          this.cartService.clearCart();
          this.orderPlaced = true;
          this.orderNumber = savedOrder.orderNumber;

          // Also save order history locally
          const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
          existingOrders.unshift(savedOrder);
          localStorage.setItem('orders', JSON.stringify(existingOrders));

          this.toastService.success('Order placed successfully!');
          this.router.navigate(['/order-confirmation']);
        } else {
          this.showError = true;
          this.errorMessage = 'Failed to place order';
          this.toastService.error(this.errorMessage);
        }
      },
      error: (error: any) => {
        console.error('Order placement failed:', error);
        this.isProcessing = false;
        this.showError = true;
        this.errorMessage = error.error?.message || 'Failed to place order. Please try again.';
        this.toastService.error(this.errorMessage);
      }
    });
  }

  /* ================= VALIDATION ================= */

  private isFormValid(): boolean {
    return Object.values(this.formData).every(val => val !== '') && this.acceptedTerms;
  }

  /* ================= NAV ================= */

  editCart(): void {
    this.router.navigate(['/cart']);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  private normalizeOrder(raw: any): any {
    const order = { ...raw };

    // Ensure stable ID
    order._id = order._id || order.orderNumber || order.orderId || `${order.orderNumber || 'ORD'}-${Date.now()}`;
    order.orderNumber = order.orderNumber || order._id;

    // Ensure status + basic fields
    order.orderStatus = order.orderStatus || 'pending';
    order.paymentMethod = order.paymentMethod || 'Cash on Delivery';
    order.paymentDetails = order.paymentDetails || { paymentStatus: 'pending' };

    // Delivery address fallback
    order.deliveryAddress = order.deliveryAddress || order.address || {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      phone: ''
    };

    // Items: ensure productName exists (template expects it)
    order.items = (order.items || []).map((item: any) => ({
      ...item,
      productName: item.productName || item.name || item.title || '',
      quantity: item.quantity ?? item.qty ?? 1,
      price: Number(item.price ?? item.unitPrice ?? 0),
      discount: Number(item.discount ?? 0)
    }));

    // Price breakdown (fallback if missing)
    order.priceBreakdown = order.priceBreakdown || {
      subtotal: Number(order.subtotal ?? order.total ?? 0),
      discount: Number(order.discount ?? 0),
      tax: Number(order.tax ?? 0),
      totalAmount: Number(order.total ?? order.subtotal ?? 0)
    };

    return order;
  }

  getUserOrders(userId: string): Observable<any> {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const normalized = orders.map((o: any) => this.normalizeOrder(o));
    return of({ orders: normalized });
  }

  getOrderDetails(orderId: string): Observable<any> {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find((o: any) =>
      o.orderNumber === orderId || o._id === orderId || o.orderId === orderId
    );
    return of({ order: order ? this.normalizeOrder(order) : null });
  }
}
