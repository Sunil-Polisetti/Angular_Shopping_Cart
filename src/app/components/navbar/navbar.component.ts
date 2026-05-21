import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

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
  private currentUserSubscription: any;
  private cartSubscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // AuthService handles restoring session state from sessionStorage.
    this.updateCartCount();

    // Subscribe to cart updates
    this.cartSubscription = this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
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
    this.router.navigate(['/']);
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}