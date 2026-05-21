import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const user = sessionStorage.getItem('currentUser');
    if (user) {
      const parsed = JSON.parse(user);
      // Normalize wrapped response shape: { user, token, message }
      this.currentUserSubject.next(parsed.user ? parsed.user : parsed);
    }
  }

  register(email: string, password: string, name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password, name });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  setCurrentUser(user: any): void {
    // If backend returns { user, token, message } shape, normalize to just user object
    if (user && user.user) {
      sessionStorage.setItem('token', user.token || sessionStorage.getItem('token'));
      user = user.user;
    }

    this.currentUserSubject.next(user);
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser() {
    return this.currentUserSubject.value;
  }
}