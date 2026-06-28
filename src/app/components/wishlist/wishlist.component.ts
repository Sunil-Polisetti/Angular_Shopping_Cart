import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlistItems: Product[] = [];

  constructor(
    private wishlistService: WishlistService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    this.wishlistItems = this.wishlistService.getWishlist();
  }

  removeFromWishlist(id: string | undefined): void {
    this.wishlistService.removeFromWishlist(id);
    this.loadWishlist();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  viewProductDetails(id: string | undefined): void {
    if (id) {
      this.router.navigate(['/product', id]);
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
