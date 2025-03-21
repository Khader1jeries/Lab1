import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../model/users.service'; 

@Component({
  selector: 'app-user-details',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any; 

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    const userData = sessionStorage.getItem('currentUser');
    if (userData) {
      this.user = JSON.parse(userData);

      // המרת תאריך מ-String ל-Date
      this.user.birthDate = new Date(this.user.birthDate);
    } else {
      this.user = this.usersService.getCurrentUser();
    }
  }
  
}
