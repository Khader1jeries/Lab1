import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: User[] = [
    new User('user1@example.com', 'password1', 'User One', new Date('1990-01-01'), 'male', 'assets/male.jpg'),
    new User('user2@example.com', 'password2', 'User Two', new Date('1995-05-05'), 'female', 'assets/female.png')
  ];

  private currentUser: User | null = null;

  constructor() {}

  // פונקציה להתחברות
  loginUser(email: string, password: string): User | null {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      sessionStorage.setItem('currentUser', JSON.stringify(user)); // שמירת המשתמש ב-session
      return user;
    }
    return null;
  }

  // פונקציה לבדיקה אם המשתמש מחובר
  isLoggedIn(): boolean {
    const userData = sessionStorage.getItem('currentUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
      return true;
    }
    return false;
  }

  // פונקציה להתנתקות
  logout(): void {
    this.currentUser = null;
    sessionStorage.removeItem('currentUser'); // מחיקת המשתמש מ-session
  }

  // פונקציה להחזרת המשתמש המחובר
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // פונקציה לרישום משתמש חדש
  registerUser(email: string, password: string, fullName: string, birthDate: Date, gender: string): void {
    const image = gender === 'male' ? 'assets/male.jpg' : 'assets/female.png';
    const newUser = new User(email, password, fullName, birthDate, gender, image);
    this.users.push(newUser);
  }

  // פונקציה להחזרת משתמש לפי מייל
  getUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }
}