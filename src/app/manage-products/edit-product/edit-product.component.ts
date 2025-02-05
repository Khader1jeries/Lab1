import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; // For routing
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../model/product.service';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  editForm: FormGroup;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      image: ['', Validators.required],
      technicalDetails: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Get product ID from route params
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
  
    if (this.productId) {
      // Fetch product details and populate form
      this.productService.getProductById(this.productId).subscribe(
        (product) => {
          if (product) {
            this.editForm.patchValue(product);
          } else {
            alert('Product not found!');
            this.router.navigate(['/manage-products']); // Navigate back if product is not found
          }
        },
        (error) => {
          console.error('Error fetching product:', error);
          alert('Error fetching product details.');
        }
      );
    }
  }
  
  saveChanges(): void {
    if (this.editForm.valid && this.productId !== null) {
      const updatedProduct: Product = {
        id: this.productId,
        ...this.editForm.value,
      };
  
      this.productService.updateProduct(this.productId, updatedProduct).subscribe(
        () => {
          alert('Product updated successfully!');
          this.router.navigate(['/manage-products']); // Navigate back to the product list
        },
        (error) => {
          console.error('Error updating product:', error);
          alert('Failed to update product.');
        }
      );
    } else {
      alert('Please fill out all required fields.');
    }
  }
  

  cancel(): void {
    this.router.navigate(['/manage-products']);
  }
}
