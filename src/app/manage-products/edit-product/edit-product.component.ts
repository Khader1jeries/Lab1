import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; // For routing
import { CommonModule } from '@angular/common';
import { ProductService } from '../../model/product.service';
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
    private productService: ProductService,
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
      const product = this.productService.getProductById(this.productId);
      if (product) {
        this.editForm.patchValue(product);
      } else {
        alert('Product not found!');
        this.router.navigate(['/manage-products']); // Navigate back if product is not found
      }
    }
  }

  saveChanges(): void {
    if (this.editForm.valid && this.productId !== null) {
      const updatedProduct: Product = {
        id: this.productId,
        ...this.editForm.value,
      };
      this.productService.updateProduct(updatedProduct);
      alert('Product updated successfully!');
      this.router.navigate(['/manage-products']); // Navigate back to the product list
    } else {
      alert('Please fill out all required fields.');
    }
  }

  cancel(): void {
    this.router.navigate(['/manage-products']);
  }
}
