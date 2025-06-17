import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../services/product.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  productForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router
  ) {
    const product = history.state.product;

    this.productForm = this.fb.group({
      id: [product?.id || '', Validators.required],
      name: [product?.name || '', Validators.required],
      description: [product?.description || ''],
      price: [product?.price || 0, [Validators.required, Validators.min(0)]],
      quantity: [
        product?.quantity || 0,
        [Validators.required, Validators.min(0)],
      ],
      image: [product?.image || ''],
      technicalDetails: [product?.technicalDetails || ''],
      ingredients: [product?.ingredients || ''],
      category: [product?.category || '', Validators.required],
    });
  }

  ngOnInit(): void {
    if (!this.productForm.get('id')?.value) {
      this.errorMessage = 'No product selected for editing.';
    }
  }

  updateProduct(): void {
    if (this.productForm.invalid) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    this.productService.updateProduct(this.productForm.value).subscribe({
      next: () => {
        this.successMessage = 'Product updated successfully!';
        setTimeout(() => this.router.navigate(['/manage-products']), 1500);
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Failed to update product.';
      },
    });
  }
}
