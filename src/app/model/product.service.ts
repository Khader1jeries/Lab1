import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    new Product(
      1,
      'Cheese Pizza',
      'Cheese pizza with a crispy crust',
      20,
      'assets/Cheese-Pizza.jpg',
      'Ingredients: Cheese, Tomato, Basil',
      'Pizza'
    ),
    new Product(
      2,
      'Napilion Pizza',
      'Delicious Napilion style pizza',
      25,
      'assets/Napilion Pizza.jpg',
      'Ingredients: Cheese, Olives, Mushrooms',
      'Pizza'
    ),
    new Product(
      3,
      'Home Made',
      'Freshly made home pizza',
      15,
      'assets/HomeMade.jpg',
      'Ingredients: Cheese, Tomato, Special sauce',
      'Pizza'
    ),
    new Product(
      4,
      'Italic Pizza',
      'Authentic Italic style pizza',
      20,
      'assets/italicpizza.jpg',
      'Ingredients: Mozzarella, Tomato, Olive oil',
      'Pizza'
    ),
    new Product(
      5,
      'American Style',
      'Classic American pizza with a thick crust',
      32,
      'assets/HomePizza.jpg',
      'Ingredients: Pepperoni, Mozzarella, Tomato sauce',
      'Pizza'
    ),
    new Product(
      16,
      'anotherBurger',
      '',
      0,
      'assets/Catalog/anotherBurger.jpg',
      '',
      'Burger'
    ),
  ];

  constructor() {}

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }
  addProduct(product: Product): void {
    this.products.push(product);
  }
  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex((p) => p.id === updatedProduct.id);
    if (index > -1) {
      this.products[index] = updatedProduct;
      localStorage.setItem('products', JSON.stringify(this.products)); // Save to localStorage if used
    }
  }
}
