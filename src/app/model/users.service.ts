import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private apiUrl = 'http://localhost:3000/users';
  private currentUser: any = null;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUserByEmail(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getCurrentUser() {
    return this.currentUser;
  }

  setCurrentUser(user: any) {
    this.currentUser = user;
  }

  private hasUser(): boolean {
    return !!sessionStorage.getItem('currentUser');
  }

  private isAdminUser(): boolean {
    const user = sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user).isAdmin : false;
  }

  loginUser(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      map(users => {
        if (users.length > 0) {
          const user = users[0]; // Assuming emails are unique
          sessionStorage.setItem('currentUser', JSON.stringify(user));
  
          this.isLoggedInSubject.next(true);
  
          return user;
        } else {
          throw new Error('Invalid email or password');
        }
      })
    );
  }
  

  logout() {
    sessionStorage.removeItem('currentUser');
    this.isLoggedInSubject.next(false);
  }
  private checkLoginStatus(): boolean {
    return !!sessionStorage.getItem('currentUser');
  }
}
