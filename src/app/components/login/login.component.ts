import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.loading = true;
    this.authService.login(this.email, this.password).subscribe(
      response => {
        this.authService.setCurrentUser(response);
        this.router.navigate(['/']);
        this.loading = false;
      },
      error => {
        this.errorMessage = error.error?.message || 'Login failed';
        this.loading = false;
      }
    );
  }
}