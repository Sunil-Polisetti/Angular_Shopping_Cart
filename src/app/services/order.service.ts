import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';
import { environment } from '../../environments/environment';

export interface Order {
  _id?: string;
  orderId?: string;
  orderNumber?: string;
  userId?: string;
  items: any[];
  totalAmount?: number;
  deliveryAddress: any;
  paymentMethod: string;
  paymentDetails?: any;
  orderStatus?: string;
  createdAt?: Date;
  priceBreakdown?: any;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // ✅ COD-only backend API
  private apiUrl = `${environment.apiUrl}/orders`;

  private currentOrderSubject = new BehaviorSubject<Order | null>(null);
  currentOrder$ = this.currentOrderSubject.asObservable();

  constructor(private http: HttpClient, private cartService: CartService) {}

  clearCart(): void {
    this.cartService.clearCart();
  }

  private getAuthHeaders() {
    const token = sessionStorage.getItem('token');
    return token ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) } : {};
  }


  // =====================================================
  // ✅ USED BY CHECKOUT (COD)
  // =====================================================
  placeOrder(orderData: Order): Observable<any> {
    return this.http.post(`${this.apiUrl}/place-order`, orderData, this.getAuthHeaders());
  }

  // =====================================================
  // ⚠️ LEGACY METHODS (KEPT TO AVOID ERRORS)
  // =====================================================

  /** Old name used in checkout.component.ts */
  createOrder(orderData: any): Observable<any> {
    // Redirect to COD logic
    return this.placeOrder(orderData);
  }

  /** Used by order-confirmation component */
  getCurrentOrder(): Order | null {
    const stored = localStorage.getItem('currentOrder');
    return stored ? JSON.parse(stored) : this.currentOrderSubject.value;
  }

  setCurrentOrder(order: Order): void {
    this.currentOrderSubject.next(order);
    localStorage.setItem('currentOrder', JSON.stringify(order));
  }


  getLastOrderId(): string | null {
    return localStorage.getItem('lastOrderId');
  }

  clearCurrentOrder(): void {
    this.currentOrderSubject.next(null);
    localStorage.removeItem('currentOrder');
  }

  private normalizeOrder(raw: any): any {
    const order: any = { ...raw };

    order._id = order._id || order.orderNumber || order.orderId || `${order.orderNumber || 'ORD'}-${Date.now()}`;
    order.orderNumber = order.orderNumber || order._id;
    order.userId = order.userId || '';

    order.orderStatus = order.orderStatus || 'pending';
    order.paymentMethod = order.paymentMethod || 'Cash on Delivery';
    order.paymentDetails = order.paymentDetails || { paymentStatus: 'pending' };

    order.deliveryAddress = order.deliveryAddress || order.address || {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      phone: ''
    };

    order.items = (order.items || []).map((item: any) => ({
      ...item,
      productName: item.productName || item.name || '',
      quantity: item.quantity ?? item.qty ?? 1,
      price: Number(item.price ?? item.unitPrice ?? 0),
      discount: Number(item.discount ?? 0)
    }));

    order.priceBreakdown = order.priceBreakdown || {
      subtotal: Number(order.subtotal ?? order.total ?? 0),
      discount: Number(order.discount ?? 0),
      tax: Number(order.tax ?? 0),
      totalAmount: Number(order.total ?? order.subtotal ?? 0)
    };

    return order;
  }

  /** Used by order-confirmation & tracking (mocked) */
  getOrderDetails(orderId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${orderId}`, this.getAuthHeaders());
  }

  /** Used by order-tracking (mocked) */
  getUserOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/my`, this.getAuthHeaders());
  }

  /** Used by order-tracking (mocked) */
  cancelOrder(orderId: string, reason: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${orderId}/cancel`, { reason }, this.getAuthHeaders());
  }
}
