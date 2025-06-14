import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'http://localhost:3000/api/carts';

  constructor(private http: HttpClient) {}

  // Get full purchase history
  getAllCartsByEmail(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${email}`);
  }

  // Update getActiveCart to properly type the response
  getActiveCart(email: string): Observable<{
    _id: string;
    items: Array<{
      _id: string;
      productId: string;
      quantity: number;
      price: number;
      name: string;
      image: string;
      stockQuantity?: number;
    }>;
  }> {
    return this.http.get<any>(`${this.baseUrl}/cart/${email}`);
  }

  // Save session cart (overwrite or create cart in DB)
  saveCart(email: string, sessionItems: any[]): Observable<any> {
    // Transform session items to match backend structure
    const itemsToSave = sessionItems.map((item) => ({
      product: item.productId, // Convert to ObjectId if needed
      quantity: item.quantity,
    }));

    return this.http.post(`${this.baseUrl}/save-full-cart`, {
      email,
      items: itemsToSave,
    });
  }

  // Add an item to cart (used in session-cart saving too)
  addToCart(item: {
    email: string;
    productId: string;
    quantity: number;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, item);
  }

  // Mark cart as paid
  markCartAsPaid(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/cart/pay/${email}`, {});
  }

  // Update item quantity
  updateItem(
    email: string,
    productId: string,
    quantity: number
  ): Observable<any> {
    return this.http.put(`${this.baseUrl}/update`, {
      email,
      productId,
      quantity,
    });
  }

  // Remove item from cart
  removeItem(email: string, productId: string): Observable<any> {
    return this.http.request('delete', `${this.baseUrl}/remove`, {
      body: { email, productId },
    });
  }
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/Products');
  }
}
