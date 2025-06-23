import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
})
export class ManageProductsComponent implements OnInit {
  products: any[] = [];
  searchCategory: string = '';

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => (this.products = data),
      error: () => alert('❌ Failed to load products'),
    });
  }

  deleteProduct(id: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => this.loadProducts(),
        error: () => alert('❌ Failed to delete product'),
      });
    }
  }

  searchByCategory(): void {
    const trimmed = this.searchCategory.trim();
    if (!trimmed) {
      alert('❗ Please enter a category');
      return;
    }

    this.productService.getProductsByCategory(trimmed).subscribe({
      next: (data) => (this.products = data),
      error: () => alert('❌ Failed to load category'),
    });
  }

  editProduct(product: any): void {
    this.router.navigate(['/Products/updateProduct'], { state: { product } });
  }

  addProduct(): void {
    this.router.navigate(['/Products/addProduct']);
  }
  increaseQuantity(product: any): void {
    const updatedProduct = {
      ...product,
      quantity: product.quantity + 10,
    };

    this.productService.increaseProductQuantity(product.id).subscribe({
      next: () => this.loadProducts(),
      error: () => alert('❌ Failed to increase quantity'),
    });
  }
}
