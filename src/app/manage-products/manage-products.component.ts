import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../model/product.service';
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

  constructor(private productService: ProductsService, private router: Router) {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data; // Initialize filteredProducts correctly
    });
  }
  

  // Delegates editing to ProductService
  editProduct(product: Product): void {
    this.productService.editProduct(this.router, product.id);
  }

  // Delegates category filtering to ProductService
  filterByCategory(event: Event): void {
    const selectedCategory = (event.target as HTMLSelectElement).value;
    this.productService.filterByCategory(selectedCategory).subscribe((data) => {
      this.filteredProducts = data;
    });
  }
  
  searchById(): void {
    if (this.searchId) {
      this.productService.searchById(this.searchId).subscribe((data) => {
        this.filteredProducts = data;
      });
    } else {
      this.productService.viewAllProducts().subscribe((data) => {
        this.filteredProducts = data; // Reset to all products
      });
    }
  }
  
}
