import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  // שליפת כל המוצרים
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // שליפת מוצר לפי ID
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // הוספת מוצר
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  // עדכון מוצר
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, product);
  }

    // Add this to ProductsService
  editProduct(router: Router, id: number): void {
    router.navigate(['/edit-product', id]); // Example navigation
  }

  filterByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?category=${category}`);
  }

  searchById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?id=${id}`);
  }

  viewAllProducts(): Observable<any[]> {
    return this.getProducts();
  }

  // מחיקת מוצר
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
