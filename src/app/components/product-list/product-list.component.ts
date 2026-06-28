import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = '';
  searchQuery: string = '';
  sortBy: string = 'popularity';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  priceRangeMin: number = 0;
  priceRangeMax: number = 0;
  loading = true;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe(
      data => {
        this.products = data;
        this.filteredProducts = data;
        this.extractCategories();
        // Set up price range filters
        const prices = data.map(p => p.price);
        if (prices.length) {
          this.priceRangeMin = Math.min(...prices);
          this.priceRangeMax = Math.max(...prices);
        } else {
          this.priceRangeMin = 0;
          this.priceRangeMax = 0;
        }
        this.minPrice = this.priceRangeMin;
        this.maxPrice = this.priceRangeMax;
        this.loading = false;
      },
      error => {
        console.error('Error fetching products:', error);
        this.loading = false;
      }
    );
  }

  extractCategories(): void {
    const categorySet = new Set(this.products.map(p => p.category));
    this.categories = Array.from(categorySet).sort();
  }

  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.applyFilters();
  }

  clearFilters(): void {
    this.selectedCategory = '';
    this.searchQuery = '';
    this.sortBy = 'popularity';
    this.minPrice = this.priceRangeMin;
    this.maxPrice = this.priceRangeMax;
    this.filteredProducts = this.products;
  }

  applyFilters(): void {
    // Ensure minPrice <= maxPrice
    if (this.minPrice !== null && this.maxPrice !== null && this.minPrice > this.maxPrice) {
      [this.minPrice, this.maxPrice] = [this.maxPrice, this.minPrice];
    }

    let filtered = this.products;

    // Filter by category
    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.category === this.selectedCategory);
    }

    // Filter by search query
    if (this.searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    if (this.minPrice !== null) {
      filtered = filtered.filter(p => p.price >= this.minPrice!);
    }
    if (this.maxPrice !== null) {
      filtered = filtered.filter(p => p.price <= this.maxPrice!);
    }

    // Sort
    switch (this.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime());
        break;
      case 'discount':
        filtered.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default: // popularity
        filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    }

    this.filteredProducts = filtered;
  }

  onSearch(): void {
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  getDiscount(product: Product): number {
    if (product.originalPrice) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return product.discount || 0;
  }

  viewProductDetails(product: Product): void {
    this.router.navigate(['/product', product._id]);
  }

  addToCart(product: Product, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.cartService.addToCart(product);
    this.toastService.success(`${product.name} added to cart!`);
  }
}

