import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  get isAdmin(): boolean {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role === 'admin' : false;
  }

  logout(): void {
    localStorage.removeItem('user');
    sessionStorage.removeItem('cart');
    this.router.navigate(['/login']);
  }

  constructor(private router: Router) {}
}
