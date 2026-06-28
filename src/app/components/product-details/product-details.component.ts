import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  quantity = 1;
  loading = true;
  error = '';
  addedToCart = false;
  selectedImage = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadProduct(params['id']);
      }
    });
  }

  loadProduct(id: string): void {
    this.loading = true;
    this.error = '';

    this.productService.getProduct(id).subscribe({
      next: (product: Product) => {
        this.product = product;
        this.selectedImage = product.image;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.error = 'Failed to load product details';
        this.loading = false;
      }
    });
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  addToCart(): void {
    if (!this.product) return;

    const cartItem = {
      ...this.product,
      quantity: this.quantity
    };

    this.cartService.addToCart(cartItem);
    this.addedToCart = true;
    this.toastService.success(`${this.product.name} (${this.quantity}) added to cart!`);

    setTimeout(() => {
      this.addedToCart = false;
    }, 2000);
  }

  increaseQuantity(): void {
    if (this.quantity < (this.product?.stock || 10)) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}
