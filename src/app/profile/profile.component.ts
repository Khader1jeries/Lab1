import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // 👈 Import AuthService

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = null;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      this.errorMessage = 'User not logged in.';
      return;
    }

    const email = JSON.parse(storedUser).email;

    this.authService.getUserByEmail(email).subscribe({
      next: (res) => {
        this.user = res;
        console.log(res);
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Failed to load profile.';
      },
    });
  }

  deleteUser(): void {
    if (!this.user?.email) return;

    const confirmDelete = confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (confirmDelete) {
      this.authService.deleteUserByEmail(this.user.email).subscribe({
        next: () => {
          alert('Account deleted successfully.');
          localStorage.removeItem('user');
          this.router.navigate(['/register']);
        },
        error: (err) => {
          this.errorMessage = err.error?.error || 'Failed to delete account.';
        },
      });
    }
  }
}
