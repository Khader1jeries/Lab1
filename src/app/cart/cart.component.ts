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
    invalidReason?: 'missing_product' | 'zero_quantity' | 'exceeds_stock';
  }

  interface Cart {
    _id?: string;
    items: CartItem[];
    email?: string;
    paid?: boolean;
    createdAt?: string;
  }

  @Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
    providers: [CurrencyPipe],
  })
  export class CartComponent implements OnInit {
    cart: Cart | null = null;
    email: string = '';
    cartInvalid: boolean = false;
    isLoading: boolean = true;
    loadError: boolean = false;
    errorMessage: string = '';
    purchaseHistory: Cart[] = [];
    showHistory = false;

    constructor(private cartService: CartService, private router: Router) {}

    ngOnInit(): void {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user?.email) {
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
          this.cart = data ?? { items: [] };

          if (!this.cart.items?.length) {
            this.cartInvalid = false;
            return;
          }

          this.validateCartItems();
        },
        error: (err) => {
          this.isLoading = false;
          this.loadError = true;
          this.errorMessage = err?.message || 'Failed to load cart';
          console.error('❌ Cart load error:', err);
        },
      });
    }

    validateCartItems(): void {
      if (!this.cart?.items?.length) return;

      this.cartService.getAllProducts().subscribe({
        next: (allProducts) => {
          let hasInvalid = false;

          this.cart!.items.forEach((item) => {
            const match = allProducts.find((p) => p._id === item.productId);

            item.invalidReason = undefined;
            item.stockQuantity = match?.quantity || 0;

            if (!match) {
              item.invalidReason = 'missing_product';
              hasInvalid = true;
            } else if (item.quantity <= 0) {
              item.invalidReason = 'zero_quantity';
              hasInvalid = true;
            } else if (item.quantity > item.stockQuantity!) {
              item.invalidReason = 'exceeds_stock';
              hasInvalid = true;
            }
          });

          this.cartInvalid = hasInvalid;

          if (hasInvalid) {
            alert(
              '⚠️ Some items in your cart are invalid. Please fix them before continuing.'
            );
          }
        },
        error: (err) => {
          console.error('❌ Product validation error:', err);
          this.cartInvalid = true;
        },
      });
    }

    updateQuantity(productId: string, event: Event): void {
      const input = event.target as HTMLInputElement;
      const quantity = Math.max(1, parseInt(input.value, 10) || 1);

      this.cartService.updateItem(this.email, productId, quantity).subscribe({
        next: () => this.loadCart(),
        error: (err) => {
          console.error('❌ Failed to update quantity:', err);
          alert('❌ Quantity update failed.');
          this.loadCart();
        },
      });
    }

    removeItem(productId: string): void {
      if (!confirm('Remove this item from your cart?')) return;

      this.cartService.removeItem(this.email, productId).subscribe({
        next: () => this.loadCart(),
        error: (err) => {
          console.error('❌ Remove item error:', err);
          alert('❌ Failed to remove item.');
        },
      });
    }

    getTotal(): number {
      return (
        this.cart?.items?.reduce((sum, item) => {
          return sum + (item.price || 0) * (item.quantity || 0);
        }, 0) || 0
      );
    }

    isCartValid(): boolean {
      return (
        !!this.cart?.items?.length &&
        !this.cartInvalid &&
        this.cart.items.every((item) => item.quantity > 0 && !item.invalidReason)
      );
    }

    pay(): void {
      if (this.cartInvalid) {
        alert('⚠️ Fix invalid items before proceeding.');
        return;
      }

      if (!confirm('Proceed to payment?')) return;

      this.cartService.markCartAsPaid(this.email).subscribe({
        next: () => {
          alert('✅ Payment successful!');
          this.router.navigate(['/catalog']);
        },
        error: (err) => {
          console.error('❌ Payment error:', err);
          alert('❌ Payment failed. Please try again.');
        },
      });
    }

    isInvalidStock(item: CartItem): boolean {
      return (
        item.stockQuantity !== undefined && item.quantity > item.stockQuantity
      );
    }
    viewHistory(): void {
      if (!this.email) return;

      this.cartService.getAllCartsByEmail(this.email).subscribe({
        next: (carts: Cart[]) => {
          this.purchaseHistory = carts.filter((c) => c.paid);
          this.showHistory = true;

          if (!this.purchaseHistory.length) {
            alert('You have no past purchases yet.');
          }
        },
        error: (err) => {
          console.error('❌ Failed to load purchase history:', err);
          alert('❌ Could not fetch purchase history.');
        },
      });
    }

    toggleHistory() {
      this.showHistory = !this.showHistory;
      if (this.showHistory && this.purchaseHistory.length === 0) {
        this.viewHistory();
      }
    }
  }
