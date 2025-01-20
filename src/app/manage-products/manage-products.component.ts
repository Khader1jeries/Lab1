import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductService } from '../model/product.service';
import { Product } from '../model/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // For [(ngModel)]
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-products',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule], // Include FormsModule for ngModel
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
})
export class ManageProductsComponent {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchId: number | null = null;

  constructor(private productService: ProductService, private router: Router) {
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products; // Initialize filteredProducts with all products
  }

  // Delegates editing to ProductService
  editProduct(product: Product): void {
    this.productService.editProduct(this.router, product.id);
  }

  // Delegates category filtering to ProductService
  filterByCategory(event: Event): void {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    this.filteredProducts =
      this.productService.filterByCategory(selectedCategory);
  }

  // Delegates searching by ID to ProductService
  searchById(): void {
    if (this.searchId) {
      this.filteredProducts = this.productService.searchById(this.searchId);
    } else {
      this.filteredProducts = this.productService.viewAllProducts(); // Reset to all products
    }
  }
}
