import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../model/product.service';
import { Product } from '../../model/product.model';

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
    private productService: ProductService,
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
      const newProduct = new Product(
        Date.now(), // Unique ID
        this.productForm.value.name,
        this.productForm.value.description,
        this.productForm.value.price,
        this.imagePreview || '', // Use imagePreview as the image path
        this.productForm.value.technicalDetails,
        this.productForm.value.category // Add this line
      );

      this.productService.addProduct(newProduct);
      alert('Product added successfully!');
      this.productForm.reset();
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }

  backToProductList() {
    this.router.navigate(['/manage-products']); // Navigate to '/manage-products'
  }
}
