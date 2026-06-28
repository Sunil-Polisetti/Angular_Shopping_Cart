import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
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

  updateProfile(name: string, currentPassword?: string, newPassword?: string): Observable<any> {
    const token = sessionStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.put(`${this.apiUrl}/update-profile`, { name, currentPassword, newPassword }, { headers });
  }
}