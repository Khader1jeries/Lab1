import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../model/users.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: any;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      const userId = parsed._id;

      // Fetch full user details from backend using ID
      this.usersService.getUserById(userId).subscribe({
        next: (userData) => {
          this.user = userData;
          if (this.user.birthDate) {
            this.user.birthDate = new Date(this.user.birthDate);
          }
        },
        error: (err) => {
          console.error('Failed to fetch user:', err);
        },
      });
    }
  }
}
