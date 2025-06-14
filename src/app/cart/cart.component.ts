import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
interface CartItem {
  _id?: string;
  productId: string;
  quantity: number;
  price?: number;
  name?: string;
  image?: string;
  stockQuantity?: number;
  invalidReason?: string;
}

interface Cart {
  _id?: string;
  items: CartItem[];
  email?: string;
  paid?: boolean;
  createdAt?: Date;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule],
  standalone: true,
  providers: [CurrencyPipe],
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;
  email: string = '';
  cartId: string = '';
  cartInvalid: boolean = false;
  isLoading: boolean = true;
  loadError: boolean = false;
  errorMessage: string = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.email) {
      alert('⚠️ Please login to view your cart.');
      this.router.navigate(['/login']);
      return;
    }

    this.email = user.email;
    this.loadCart();
  }

  loadCart(): void {
    this.isLoading = true;
    this.loadError = false;
    this.errorMessage = '';

    this.cartService.getActiveCart(this.email).subscribe({
      next: (data: Cart) => {
        this.isLoading = false;
        this.cart = data || { items: [] };
        this.cartId = data?._id || '';

        if (!this.cart.items || this.cart.items.length === 0) {
          this.cartInvalid = false;
          return;
        }

        this.validateCartItems();
      },
      error: (err) => {
        this.isLoading = false;
        this.loadError = true;
        this.errorMessage = err.message || 'Failed to load cart';
        console.error('Cart load error:', err);
      },
    });
  }

  validateCartItems(): void {
    if (!this.cart?.items) {
      this.cartInvalid = false;
      return;
    }

    this.cartService.getAllProducts().subscribe({
      next: (allProducts: any[]) => {
        let invalidFound = false;

        this.cart?.items?.forEach((item: CartItem) => {
          const product = allProducts.find((p) => p._id === item.productId);

          item.invalidReason = undefined;
          item.stockQuantity = product?.quantity || 0;

          if (!product) {
            invalidFound = true;
            item.invalidReason = 'missing_product';
          } else if (item.quantity <= 0) {
            invalidFound = true;
            item.invalidReason = 'zero_quantity';
          } else if (item.quantity > (item.stockQuantity || 0)) {
            invalidFound = true;
            item.invalidReason = 'exceeds_stock';
          }
        });

        this.cartInvalid = invalidFound;

        if (invalidFound) {
          alert(
            '⚠️ Some items in your cart are invalid. Please fix or remove them before proceeding.'
          );
        }
      },
      error: (err) => {
        console.error('Product validation error:', err);
        this.cartInvalid = true;
      },
    });
  }

  updateQuantity(productId: string, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const quantity = parseInt(inputElement.value, 10);

    if (isNaN(quantity)) {
      console.error('Invalid quantity input');
      return;
    }

    this.cartService.updateItem(this.email, productId, quantity).subscribe({
      next: () => this.loadCart(),
      error: (err) => {
        console.error('Update quantity error:', err);
        alert('❌ Failed to update quantity');
        this.loadCart(); // Refresh to show correct values
      },
    });
  }

  removeItem(productId: string): void {
    if (!confirm('Are you sure you want to remove this item?')) {
      return;
    }

    this.cartService.removeItem(this.email, productId).subscribe({
      next: () => this.loadCart(),
      error: (err) => {
        console.error('Remove item error:', err);
        alert('❌ Failed to remove item');
      },
    });
  }

  getTotal(): number {
    if (!this.cart?.items) return 0;

    return this.cart.items.reduce((sum, item) => {
      return sum + (item.price || 0) * (item.quantity || 0);
    }, 0);
  }

  isCartValid(): boolean {
    return (
      !!this.cart?.items &&
      !this.cartInvalid &&
      this.cart.items.every((item) => (item.quantity || 0) > 0)
    );
  }

  pay(): void {
    if (this.cartInvalid) {
      alert('⚠️ Please fix item quantities before proceeding to payment.');
      return;
    }

    if (!confirm('Proceed to payment?')) {
      return;
    }

    this.cartService.markCartAsPaid(this.email).subscribe({
      next: () => {
        alert('✅ Payment successful');
        this.router.navigate(['/history']);
      },
      error: (err) => {
        console.error('Payment error:', err);
        alert('❌ Payment failed. Please try again.');
      },
    });
  }

  isInvalidStock(item: CartItem): boolean {
    return (
      item.stockQuantity !== undefined && item.quantity > item.stockQuantity
    );
  }
}
