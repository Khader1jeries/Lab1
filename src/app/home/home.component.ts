import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Import RouterModule
import { ProductService } from '../module/product.service';
import { Product } from '../module/product.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Add RouterModule here
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: Product[] = [];

  constructor(private productService: ProductService) {
    this.products = this.productService.getProducts();
  }

  // Method to add product to the cart
  addToCart(product: Product): void {
    alert(`${product.name} has been added to the cart!`);
  }
}
