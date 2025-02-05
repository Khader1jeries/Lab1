import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductsService } from '../../model/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true, // Mark this as a standalone component
  imports: [CommonModule, ReactiveFormsModule], // Explicitly import required modules
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  productForm: FormGroup;
  errorMessage: string = '';
  imagePreview: string | null = null; // To store the preview of the uploaded image

  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private router: Router // Inject Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      image: [''], // Optional now
      technicalDetails: ['', Validators.required],
      category: ['', Validators.required], // Add category field
    });
  }

  addProduct() {
    if (this.productForm.valid) {
      const newProduct = {
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        price: this.productForm.value.price,
        image: this.imagePreview || '',
        technicalDetails: this.productForm.value.technicalDetails,
        category: this.productForm.value.category,
      };

      this.productService.addProduct(newProduct); // Call the service to add the product
      alert('Product added successfully!');
      this.productForm.reset();
      this.imagePreview = null; // Reset the preview
      this.backToProductList(); // Navigate back to the product list
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }

  backToProductList() {
    this.router.navigate(['/manage-products']); // Navigate to '/manage-products'
  }
}
