import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CartItemDTO {
  product: string; // MongoDB ObjectId
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = 'http://localhost:3000/api/carts';
  private productsUrl = 'http://localhost:3000/api/Products';

  constructor(private http: HttpClient) {}

  /** 🧾 Get all paid/unpaid carts */
  getAllCartsByEmail(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${email}`);
  }

  /** 🛒 Get latest unpaid cart (flattened product data) */
  getActiveCart(email: string): Observable<{
    _id: string;
    email: string;
    items: Array<{
      _id: string;
      productId: string;
      quantity: number;
      price: number;
      name: string;
      image: string;
      stockQuantity: number;
    }>;
    paid: boolean;
    createdAt: string;
  }> {
    return this.http.get<any>(`${this.baseUrl}/cart/${email}`);
  }

  /** 💾 Overwrite full cart with items */
  saveCart(email: string, items: CartItemDTO[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/save-full-cart`, {
      email,
      items,
    });
  }

  /** ➕ Add a single item to cart (or merge if exists) */
  addToCart(productId: string, quantity: number): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.email) throw new Error('User not logged in');

    return this.http.post(`${this.baseUrl}/add`, {
      email: user.email,
      productId,
      quantity,
    });
  }

  /** 💳 Mark unpaid cart as paid */
  markCartAsPaid(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/cart/pay/${email}`, {});
  }

  /** ✏️ Update quantity of item */
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

  /** ❌ Remove item from cart */
  removeItem(email: string, productId: string): Observable<any> {
    return this.http.request('delete', `${this.baseUrl}/remove`, {
      body: { email, productId },
    });
  }

  /** 📦 Load all products */
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.productsUrl);
  }
}
