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

  // Navigate to the edit page
  editProduct(product: Product): void {
    this.router.navigate(['/edit-product', product.id]);
  }

  // Filter by category
  filterByCategory(event: Event): void {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    if (selectedCategory) {
      this.filteredProducts = this.products.filter(
        (product) => product.category === selectedCategory
      );
    } else {
      this.filteredProducts = this.products; // Reset to all products
    }
  }

  // Search by ID
  searchById(): void {
    if (this.searchId) {
      this.filteredProducts = this.products.filter(
        (product) => product.id === this.searchId
      );
    } else {
      this.filteredProducts = this.products; // Reset to all products
    }
  }
}
