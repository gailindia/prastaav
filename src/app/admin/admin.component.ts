import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  mobileNumber: string = '';
  otp: string = '';
  otpSent: boolean = false; // Flag to control OTP field visibility

  constructor(private router: Router) { }

  login() {
    // Simulate sending OTP logic
    if (!this.otpSent) {
      // Send OTP logic (simulated delay using setTimeout)
      setTimeout(() => {
        // After sending OTP, show the OTP field
        this.otpSent = true;
      }, 1000); // Simulated delay of 1 second
    } else {
      // Simulate login logic
      const isAuthenticated = this.authenticate();
      if (isAuthenticated) {
        // Navigate to the admin page after successful login
        this.router.navigate(['/admin']);
      }
    }
  }

  // Simulated authentication method
  authenticate(): boolean {
    // Check if mobile number and OTP are valid (you may add more validation here)
    const isValid = this.mobileNumber.length > 0 && this.otp.length > 0;

    return isValid;
  }
}