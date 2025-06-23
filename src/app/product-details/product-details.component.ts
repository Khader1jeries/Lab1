import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsService, Product } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService,
    private cartService: CartService
  ) {}
  get isAdmin(): boolean {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role === 'admin' : false;
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (data) => (this.product = data),
        error: () => alert('❌ Failed to load product details'),
      });
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  addToCart(): void {
    if (!this.product || !this.product._id) return;

    this.cartService.addToCart(this.product._id, 1).subscribe({
      next: () => {
        alert('✅ Added to cart!');
        this.router.navigate(['/cart']);
      },
      error: (err) => {
        console.error('❌ Add to cart failed', err);
        alert('❌ Could not add to cart. Are you logged in?');
      },
    });
  }
}
