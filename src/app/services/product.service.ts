import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  _id?: string; // MongoDB ObjectId
  id: string; // Custom numeric string
  name: string;
  description?: string;
  price: number;
  image?: string;
  technicalDetails?: string;
  ingredients?: string;
  category?: string;
  quantity: number;
  popularity?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'http://localhost:3000/api/Products';

  constructor(private http: HttpClient) {}

  /** 📦 Get all products */
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  /** 🗂️ Get products by category */
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/category/${category}`);
  }

  /** 🔥 Get 5 random products */
  getPopularProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/popular`);
  }

  /** ➕ Add a new product */
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/addProduct`, product);
  }

  /** ✏️ Update an existing product */
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/updateProduct`, product);
  }

  increaseProductQuantity(id: string) {
    return this.http.put(`${this.baseUrl}/increase/${id}`, {});
  }

  /** ❌ Delete a product by its custom numeric ID */
  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteProduct/${productId}`);
  }
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/id/${id}`);
  }
}
