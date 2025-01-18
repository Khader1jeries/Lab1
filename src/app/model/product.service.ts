import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    new Product(1, 'Cheese Pizza', 'Cheese pizza with a crispy crust', 20, 'assets/Cheese-Pizza.jpg', 'Ingredients: Cheese, Tomato, Basil'),
    new Product(2, 'Napilion Pizza', 'Delicious Napilion style pizza', 25, 'assets/Napilion Pizza.jpg', 'Ingredients: Cheese, Olives, Mushrooms'),
    new Product(3, 'Home Made', 'Freshly made home pizza', 15, 'assets/HomeMade.jpg', 'Ingredients: Cheese, Tomato, Special sauce'),
    new Product(4, 'Italic Pizza', 'Authentic Italic style pizza', 20, 'assets/italicpizza.jpg', 'Ingredients: Mozzarella, Tomato, Olive oil'),
    new Product(5, 'American Style', 'Classic American pizza with a thick crust', 32, 'assets/HomePizza.jpg', 'Ingredients: Pepperoni, Mozzarella, Tomato sauce'),
  ];

  constructor() {}

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }
}
