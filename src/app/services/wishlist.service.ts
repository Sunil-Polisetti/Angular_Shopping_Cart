import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly WISHLIST_KEY = 'shoppingWishlist';
  private wishlist: Product[] = [];
  private wishlistCountSubject = new BehaviorSubject<number>(0);
  wishlistCount$ = this.wishlistCountSubject.asObservable();

  constructor(private toastService: ToastService) {
    this.loadWishlist();
  }

  private loadWishlist(): void {
    try {
      const saved = localStorage.getItem(this.WISHLIST_KEY);
      this.wishlist = saved ? JSON.parse(saved) : [];
      this.wishlistCountSubject.next(this.wishlist.length);
    } catch {
      this.wishlist = [];
      this.saveWishlist();
    }
  }

  private saveWishlist(): void {
    localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(this.wishlist));
    this.wishlistCountSubject.next(this.wishlist.length);
  }

  getWishlist(): Product[] {
    return [...this.wishlist];
  }

  toggleWishlist(product: Product): void {
    const index = this.wishlist.findIndex(item => item._id === product._id);
    if (index >= 0) {
      this.wishlist.splice(index, 1);
      this.toastService.info(`${product.name} removed from wishlist`);
    } else {
      this.wishlist.push(product);
      this.toastService.success(`${product.name} added to wishlist!`);
    }
    this.saveWishlist();
  }

  removeFromWishlist(productId: string | undefined): void {
    if (!productId) return;
    const index = this.wishlist.findIndex(item => item._id === productId);
    if (index >= 0) {
      const name = this.wishlist[index].name;
      this.wishlist.splice(index, 1);
      this.saveWishlist();
      this.toastService.info(`${name} removed from wishlist`);
    }
  }

  isInWishlist(productId: string | undefined): boolean {
    if (!productId) return false;
    return this.wishlist.some(item => item._id === productId);
  }
}
