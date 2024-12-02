import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  products = [
    { name: 'Product 1', description: 'first product', price: 20 },
    { name: 'Product 2', description: 'second product', price: 25 },
    { name: 'Product 3', description: 'third product', price: 15 },
    { name: 'Product 4', description: 'forth product', price: 20 },
    { name: 'Product 5', description: 'fifth product', price: 32 }
  ];

  // Method to handle adding product to cart
  addToCart(product: any): void {
    alert(`${product.name} has been added to the cart!`);
  }
}
