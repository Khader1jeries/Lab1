// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'http://localhost:3000/api/Products';

  constructor(private http: HttpClient) {}

  // Get all products
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Get products by category
  getProductsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${category}`);
  }

  // Get top 5 popular products
  getPopularProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/showPopular`);
  }

  // Add a new product
  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addProduct`, product);
  }

  // Update a product by ID
  updateProduct(product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/updateProduct`, product);
  }

  // Delete a product by ID (numeric string)
  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteProduct/${productId}`);
  }
}
