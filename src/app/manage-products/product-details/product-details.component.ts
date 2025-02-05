import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../model/product.service';
import { Product } from '../../model/product.model';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf and other directives

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule], // Import CommonModule
  templateUrl:'./product-details.component.html',
  styleUrls: ['./product-details.component.css'], // Link to the external CSS file
})
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(Number(productId)).subscribe(
        (productData: Product) => {
          this.product = productData;
        },
        (error) => {
          console.error('Error fetching product:', error);
        }
      );
    }
  }
}
