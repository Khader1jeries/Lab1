import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService, Product } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  products: Product[] = [];
  filtered: Product[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';
  sortPopular: boolean = false;

  constructor(
    private router: Router,
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filtered = [...data];
        this.extractCategories(data);
      },
      error: () => alert('❌ Failed to load products'),
    });
  }

  extractCategories(data: Product[]): void {
    const unique = new Set(data.map((p) => p.category));
    this.categories = Array.from(unique).filter(
      (c): c is string => typeof c === 'string'
    );
  }

  onCategoryChange(): void {
    if (this.selectedCategory === 'All') {
      this.filtered = [...this.products];
    } else {
      this.productService
        .getProductsByCategory(this.selectedCategory)
        .subscribe({
          next: (data) => {
            this.filtered = data;
            if (this.sortPopular) {
              this.filtered.sort(
                (a, b) => (b.popularity || 0) - (a.popularity || 0)
              );
            }
          },
          error: () => alert('❌ Failed to load products by category'),
        });
      return;
    }

    if (this.sortPopular) {
      this.filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }
  }

  toggleSort(): void {
    this.onCategoryChange();
  }

  addToCart(product: Product): void {
    if (product.quantity <= 0) {
      alert('❌ This product is currently out of stock.');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.email) {
      alert('⚠️ Please login to add to cart.');
      return;
    }

    this.cartService.addToCart(product._id!, 1).subscribe({
      next: () => alert('✅ Product added to your cart.'),
      error: () => alert('❌ Failed to add to cart.'),
    });
  }

  buyNow(product: Product): void {
    if (product.quantity <= 0) {
      alert('❌ This product is currently out of stock.');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.email) {
      alert('⚠️ Please login to continue.');
      return;
    }

    this.cartService.addToCart(product._id!, 1).subscribe({
      next: () => this.router.navigate(['/cart']),
      error: () => alert('❌ Failed to add to cart.'),
    });
  }
}
