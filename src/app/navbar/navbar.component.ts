import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersService } from '../model/users.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.usersService.isLoggedIn(); // בדיקה אם המשתמש מחובר
  }

  // פונקציה להתנתקות
  logout(): void {
    this.usersService.logout(); // התנתקות
    this.isLoggedIn = false; // עדכון מצב התחברות
    window.location.href = '/home'; // ניתוב לדף הבית
  }
}