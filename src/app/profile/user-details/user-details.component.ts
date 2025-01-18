import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../model/users.service'; // ייבוא השירות

@Component({
  selector: 'app-user-details',
  standalone: true, // הגדרת הקומפוננטה כ-standalone
  imports: [CommonModule], // ייבוא CommonModule
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any; // המשתמש המחובר

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.user = this.usersService.getCurrentUser(); // קבלת המשתמש המחובר
  }
}