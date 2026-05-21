import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  subtotal: number = 0;
  tax: number = 0;
  discount: number = 0;
  total: number = 0;
  GST_RATE = 0.18; // 18% GST for India

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCart();
    this.calculatePrices();
  }

  removeItem(index: number): void {
    this.cartService.removeItem(index);
    this.loadCart();
  }

  calculatePrices(): void {
    // Calculate subtotal
    this.subtotal = this.cartItems.reduce(
      (sum, item) => sum + (item.price * (item.quantity || 1)),
      0
    );

    // Calculate discount based on discount percentage
    this.discount = this.cartItems.reduce(
      (sum, item) => {
        const itemPrice = item.price * (item.quantity || 1);
        const discountAmount = (itemPrice * (item.discount || 0)) / 100;
        return sum + discountAmount;
      },
      0
    );

    // Calculate tax on (subtotal - discount)
    this.tax = Math.round(((this.subtotal - this.discount) * this.GST_RATE) * 100) / 100;

    // Calculate total
    this.total = this.subtotal - this.discount + this.tax;
  }

  isUserLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  proceedToCheckout(): void {
    if (!this.isUserLoggedIn()) {
      alert('Please login to proceed with checkout');
      this.router.navigate(['/login']);
      return;
    }

    if (this.cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    this.router.navigate(['/checkout']);
  }
}

