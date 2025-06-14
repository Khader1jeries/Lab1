import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];
  errorMessage = '';

  constructor(private userService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (res) => (this.users = res),
      error: (err) =>
        (this.errorMessage = err.error?.error || 'Failed to load users'),
    });
  }

  deleteUser(email: string): void {
    if (confirm(`Delete user ${email}?`)) {
      this.userService
        .deleteUserByEmail(email)
        .subscribe(() => this.loadUsers());
    }
  }
}
