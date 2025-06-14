import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill all fields correctly.';
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.successMessage = 'Login successful. Loading your cart...';

        // Load the cart after login
        this.cartService.getAllCartsByEmail(email).subscribe({
          next: (cartItems) => {
            // Save cart to localStorage or a dedicated cart state service
            sessionStorage.setItem('cart', JSON.stringify(cartItems));
            this.successMessage = 'Login successful. Redirecting...';
            setTimeout(() => this.router.navigate(['/home']), 1500);
          },
          error: () => {
            // If cart load fails, still proceed
            this.successMessage = 'Login successful. Redirecting...';
            setTimeout(() => this.router.navigate(['/home']), 1500);
          },
        });
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Login failed';
      },
    });
  }
}
