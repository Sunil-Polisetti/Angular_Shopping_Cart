import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  name = '';
  email = '';
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.name = user.name || '';
      this.email = user.email || '';
    } else {
      this.router.navigate(['/login']);
    }
  }

  updateProfile(): void {
    if (!this.name.trim()) {
      this.toastService.error('Name cannot be empty');
      return;
    }

    if (this.newPassword || this.confirmPassword || this.currentPassword) {
      if (!this.currentPassword) {
        this.toastService.error('Current password is required to change password');
        return;
      }
      if (!this.newPassword) {
        this.toastService.error('New password is required');
        return;
      }
      if (this.newPassword !== this.confirmPassword) {
        this.toastService.error('New passwords do not match');
        return;
      }
    }

    this.loading = true;
    this.authService.updateProfile(this.name, this.currentPassword, this.newPassword).subscribe({
      next: (response: any) => {
        this.loading = false;
        // Update local session storage
        this.authService.setCurrentUser(response.user);
        this.toastService.success('Profile updated successfully!');
        
        // Clear password fields
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error: (error: any) => {
        this.loading = false;
        const errMsg = error.error?.message || 'Failed to update profile';
        this.toastService.error(errMsg);
      }
    });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
