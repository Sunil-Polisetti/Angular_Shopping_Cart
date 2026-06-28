import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  currentUser: any;
  cartCount = 0;
  showUserMenu = false;
  searchQuery = '';
  private currentUserSubscription: any;
  private cartSubscription: Subscription | null = null;
  private searchSubscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    // AuthService handles restoring session state from sessionStorage.
    this.updateCartCount();

    // Subscribe to cart updates
    this.cartSubscription = this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    // Subscribe to search query updates
    this.searchSubscription = this.productService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
    });

    this.currentUserSubscription = this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.isLoggedIn = true;
      } else {
        this.currentUser = null;
        this.isLoggedIn = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }

    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }

    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  onSearch(): void {
    this.productService.setSearchQuery(this.searchQuery);
    if (this.router.url !== '/' && !this.router.url.startsWith('/?')) {
      this.router.navigate(['/']);
    }
  }

  updateCartCount() {
    this.cartCount = this.cartService.getCartCount();
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('token');
    this.authService.logout();
    this.currentUser = null;
    this.isLoggedIn = false;
    this.showUserMenu = false;
    this.toastService.info('Logged out successfully');
    this.router.navigate(['/']);
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}