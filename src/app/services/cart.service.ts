import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  discount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly CART_KEY = 'shoppingCart';
  private cart: CartItem[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor() {
    this.loadCartFromStorage();
    this.cartCountSubject.next(this.getCartCount());
  }

  /* ---------------- STORAGE ---------------- */

  private loadCartFromStorage(): void {
    try {
      const saved = localStorage.getItem(this.CART_KEY);
      this.cart = saved ? JSON.parse(saved) : [];
      this.cart = this.cart.map(item => this.sanitizeItem(item));
    } catch {
      this.cart = [];
      this.saveCartToStorage();
    }
  }

  private saveCartToStorage(): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(this.cart));
    this.cartCountSubject.next(this.getCartCount());
  }

  /* ---------------- SANITIZATION ---------------- */

  private sanitizeItem(item: any): CartItem {
    return {
      _id: String(item._id),
      name: String(item.name),
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
      discount: Number(item.discount) || 0
    };
  }

  /* ---------------- CART ACTIONS ---------------- */

  addToCart(product: any): void {
    const sanitized = this.sanitizeItem(product);

    const existingItem = this.cart.find(
      item => item._id === sanitized._id
    );

    if (existingItem) {
      existingItem.quantity += sanitized.quantity;
    } else {
      this.cart.push(sanitized);
    }

    this.saveCartToStorage();
  }

  getCart(): CartItem[] {
    return [...this.cart]; // prevent mutation
  }

  removeItem(index: number): void {
    if (index >= 0 && index < this.cart.length) {
      this.cart.splice(index, 1);
      this.saveCartToStorage();
    }
  }

  clearCart(): void {
    this.cart = [];
    this.saveCartToStorage();
  }

  /* ---------------- HELPERS ---------------- */

  getCartCount(): number {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }

  getSubtotal(): number {
    return this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  getDiscountTotal(): number {
    return this.cart.reduce(
      (sum, item) =>
        sum + (item.price * item.quantity * item.discount) / 100,
      0
    );
  }

  getTotalAmount(): number {
    const subtotal = this.getSubtotal();
    const discount = this.getDiscountTotal();
    const tax = (subtotal - discount) * 0.18;
    return Math.round((subtotal - discount + tax) * 100) / 100;
  }
}
