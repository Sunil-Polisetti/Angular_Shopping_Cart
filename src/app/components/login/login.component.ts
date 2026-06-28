import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

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
    private router: Router,
    private toastService: ToastService
  ) {}

  login(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      this.toastService.error(this.errorMessage);
      return;
    }

    this.loading = true;
    this.authService.login(this.email, this.password).subscribe(
      response => {
        this.authService.setCurrentUser(response);
        this.toastService.success('Logged in successfully!');
        this.router.navigate(['/']);
        this.loading = false;
      },
      error => {
        this.errorMessage = error.error?.message || 'Login failed';
        this.toastService.error(this.errorMessage);
        this.loading = false;
      }
    );
  }
}