import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../model/product.service';
import { Product } from '../../model/product.model';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf and other directives

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule], // Import CommonModule
  template: `
    <body>
      <div *ngIf="product; else notFound" class="product-details">
        <h1 style="margin-top: 20px">{{ product.name }}</h1>
        <p class="description">{{ product.description }}</p>
        <p class="price"><strong>Price:</strong> {{ product.price }}</p>
        <p class="technical-details">
          <strong>Details:</strong> {{ product.technicalDetails }}
        </p>
        <img
          [src]="product.image"
          alt="{{ product.name }}"
          class="product-image"
        />
      </div>
    </body>
    <ng-template #notFound>
      <div class="not-found">
        <h2>Product Not Found</h2>
      </div>
    </ng-template>
  `,
  styleUrls: ['./product-details.component.css'], // Link to the external CSS file
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.product = this.productService.getProductById(Number(productId));
    }
  }
}
