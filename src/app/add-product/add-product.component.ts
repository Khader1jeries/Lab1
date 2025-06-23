import { Component } from '@angular/core';
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
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  productForm: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      image: [''],
      technicalDetails: [''],
      ingredients: [''],
      quantity: [0, [Validators.required, Validators.min(0)]],
      minQuantity: [
        5, // default value
        [Validators.required, Validators.pattern('^[1-9][0-9]*$')],
      ],
      category: ['', Validators.required],
    });
  }

  addProduct(): void {
    if (this.productForm.invalid) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    this.productService.addProduct(this.productForm.value).subscribe({
      next: () => {
        this.successMessage = 'Product added successfully!';
        setTimeout(() => this.router.navigate(['/manage-products']), 1500);
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Failed to add product.';
      },
    });
  }
}
