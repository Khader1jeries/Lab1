import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../services/product.service';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
})
export class ManageProductsComponent implements OnInit {
  products: any[] = [];

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

  editProduct(product: any): void {
    this.router.navigate(['/Products/updateProduct'], { state: { product } });
  }

  addProduct(): void {
    this.router.navigate(['/Products/addProduct']);
  }
}
