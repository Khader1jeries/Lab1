import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, { email, password });
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/auth/user/${id}`);
  }

  updateUser(id: string, data: Partial<User>): Observable<any> {
    return this.http.put(`${this.baseUrl}/auth/user/${id}`, data);
  }

  deleteUserByEmail(email: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/auth/users/deleteUser/${email}`);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/auth/users/profile/${email}`);
  }

  loginWithParams(email: string, password: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/auth/users/login/${email}/${password}`
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/auth/users`);
  }
}
