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
      35,
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
  addProduct(newProduct: any): void {
    const product = new Product(
      Date.now(), // Generate a unique ID
      newProduct.name,
      newProduct.description,
      newProduct.price,
      newProduct.image,
      newProduct.technicalDetails,
      newProduct.category
    );

    this.products.push(product); // Add the product to the array
    localStorage.setItem('products', JSON.stringify(this.products)); // Optional: Persist data to localStorage
  }

  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex((p) => p.id === updatedProduct.id);
    if (index > -1) {
      this.products[index] = updatedProduct;
      localStorage.setItem('products', JSON.stringify(this.products)); // Save to localStorage if used
    }
  }

  // Filter by category
  filterByCategory(selectedCategory: string): Product[] {
    if (selectedCategory) {
      return this.products.filter(
        (product) => product.category === selectedCategory
      );
    } else {
      return this.products; // Return all products
    }
  }

  // Search by ID
  searchById(productId: number): Product[] {
    if (productId) {
      return this.products.filter((product) => product.id === productId);
    } else {
      return this.products; // Return all products
    }
  }

  // View all products
  viewAllProducts(): Product[] {
    return this.products; // Return all products
  }
  // Navigate to the edit page
  editProduct(router: any, productId: number): void {
    router.navigate(['/edit-product', productId]);
  }
}
