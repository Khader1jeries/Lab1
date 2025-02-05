import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // Import Router
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
  isAdmin: boolean = false;
  userImage: string = '';

  constructor(private usersService: UsersService, private router: Router) {} // Inject Router

  ngOnInit(): void {
    this.usersService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
      if (loggedIn) {
        const user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
        this.isAdmin = user.isAdmin;
        this.userImage = user.image;
      }
    });
  }

  onLogout() {
    this.usersService.logout();
    this.router.navigate(['/home']); // Redirect to home after logout
  }
}
