import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent implements OnInit {
  products: any[] = [];
  filtered: any[] = [];
  categories: string[] = [];
  selectedCategory: string = 'All';
  sortPopular: boolean = false;

  sessionCart: any[] = [];

  constructor(
    private router: Router,
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadAllProducts();
    this.loadSessionCart();
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

  extractCategories(data: any[]): void {
    const unique = new Set(data.map((p) => p.category).filter((c) => !!c));
    this.categories = Array.from(unique);
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

  loadSessionCart(): void {
    const storedCart = sessionStorage.getItem('cart');
    this.sessionCart = storedCart ? JSON.parse(storedCart) : [];
  }

  saveSessionCart(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.sessionCart));
  }

  addToCart(product: any): void {
    if (product.quantity <= 0) {
      alert('❌ This product is currently out of stock.');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.email) {
      alert('⚠️ Please login to add to cart.');
      return;
    }

    // Correct: use _id (the Mongo ObjectId string)
    const existing = this.sessionCart.find(
      (item) => item.productId === product._id
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      this.sessionCart.push({
        email: user.email,
        productId: product._id, // <-- Use _id here
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    this.saveSessionCart();
    alert('✅ Product added to cart (session).');
  }

  // catalog.component.ts - Update buyNow method:
  buyNow(product: any): void {
    if (product.quantity <= 0) {
      alert('❌ This product is currently out of stock.');
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.email) {
      alert('⚠️ Please login to continue.');
      return;
    }

    // Create temporary cart with just this product
    const tempCart = [
      {
        productId: product._id,
        quantity: 1,
        name: product.name,
        price: product.price,
      },
    ];

    this.cartService.saveCart(user.email, tempCart).subscribe({
      next: () => {
        sessionStorage.removeItem('cart');
        this.router.navigate(['/cart']);
      },
      error: (err) => {
        console.error('Save error:', err);
        alert('❌ Failed to save cart. Please try again.');
      },
    });
  }

  saveCartToDbAndNavigate(targetRoute: string): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.email) {
      alert('⚠️ Please login to continue.');
      return;
    }

    this.cartService.saveCart(user.email, this.sessionCart).subscribe({
      next: () => {
        sessionStorage.removeItem('cart');
        this.router.navigate([targetRoute]);
      },
      error: () => alert('❌ Failed to save cart.'),
    });
  }
}
