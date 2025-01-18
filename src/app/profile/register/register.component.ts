import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../model/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports:[ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      fullName: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  // פונקציה לרישום
  register(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      return;
    }

    const { email, password, fullName, birthDate, gender } = this.registerForm.value;

    // בדיקה אם המשתמש כבר קיים
    if (this.usersService.getUserByEmail(email)) {
      this.errorMessage = 'User with this email already exists.';
      return;
    }

    // המרת תאריך ל-Date
    const date = new Date(birthDate);

    // רישום המשתמש
    this.usersService.registerUser(email, password, fullName, date, gender);

    // ניתוב לדף login לאחר רישום מוצלח
    this.router.navigate(['/profile/login']);
  }

  // פונקציה לחזרה לדף login
  backToLogin(): void {
    this.router.navigate(['/profile/login']);
  }
}