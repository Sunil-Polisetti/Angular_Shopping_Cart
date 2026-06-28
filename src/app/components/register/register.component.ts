import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  register(): void {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      this.toastService.error(this.errorMessage);
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      this.toastService.error(this.errorMessage);
      return;
    }

    this.loading = true;
    this.authService.register(this.email, this.password, this.name).subscribe(
      response => {
        this.authService.setCurrentUser(response);
        this.toastService.success('Account created successfully!');
        this.router.navigate(['/']);
        this.loading = false;
      },
      error => {
        this.errorMessage = error.error?.message || 'Registration failed';
        this.toastService.error(this.errorMessage);
        this.loading = false;
      }
    );
  }
}