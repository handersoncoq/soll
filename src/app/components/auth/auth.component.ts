import { Component, OnInit } from '@angular/core';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, applyActionCode, confirmPasswordReset } from 'firebase/auth';
import { firebaseConfig } from 'src/app/config/firebase.config';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  message = 'Confirming your email…';
  success = false;
  error = false;
  status: 'success' | 'error' | 'warning' | null = null;
  isExpiredLink: boolean = false;
  isForEmailVerification: boolean = false;
  isForPasswordReset: boolean = false;

  oobCode: string | null = null;
  newPassword: string = '';
  confirmPassword: string = '';
  showResetForm: boolean = false;
  isProcessing: boolean = false;

  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;

  passwordStrength = {
    length: false,
    pattern: false,
  };

  passwordsMatch: boolean = true;

  get passwordStrengthClass(): 'strong' | 'medium' | 'weak' {
    const { length, pattern } = this.passwordStrength;
    if (length && pattern) {
      return 'strong';
    } else if (length) {
      return 'medium';
    } else {
      return 'weak';
    }
  }

  ngOnInit(): void {
    try {
      if (!getApps().length) {
        initializeApp(firebaseConfig);
      }

      const params = new URLSearchParams(window.location.search);
      const mode = params.get('mode');
      const oobCode = params.get('oobCode');
      this.handleVerification(mode, oobCode);
    } catch {
      this.showMessage(
        'Something went wrong while verifying your request. Please try again later.',
        'error'
      );
    }
  }

  onPasswordInput(): void {
    this.passwordStrength.length = this.newPassword.length >= 8;
    const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])/;
    this.passwordStrength.pattern = pattern.test(this.newPassword);
    this.passwordsMatch = this.newPassword === this.confirmPassword;
  }

  toggleNewPasswordVisibility(): void {
    this.showNewPassword = !this.showNewPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  handleVerification(mode: string | null, oobCode: string | null): void {
    if (mode === 'verifyEmail' && oobCode) {
      this.isForEmailVerification = true;
      this.handleEmailVerification(oobCode);
    } else if (mode === 'resetPassword' && oobCode) {
      this.isForPasswordReset = true;
      this.showMessage(
        'Please enter your new password below to reset your password.',
        'warning'
      );
      this.oobCode = oobCode;
      this.showResetForm = true;
    } else {
      this.showMessage(
        "We're sorry, but this link is either invalid or has already been used.",
        'error'
      );
    }
  }

  handleEmailVerification(oobCode: string): void {
    const auth = getAuth();
    applyActionCode(auth, oobCode)
      .then(() => {
        this.showMessage(
          'We have successfully verified your email. Redirecting you to the app…',
          'success'
        );
        this.success = true;
        this.isExpiredLink = false;
        setTimeout(() => {
          window.location.href = 'sollapp://login';
        }, 3000);
      })
      .catch((error) => {
        this.handleFirebaseError(error);
      });
  }

  resetPassword(): void {
    if (!this.newPassword || !this.confirmPassword) {
      this.showMessage('Please fill out all password fields.', 'error');
      return;
    }

    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (!passwordPattern.test(this.newPassword)) {
      this.showMessage(
        'Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.',
        'error'
      );
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.showMessage('Passwords do not match.', 'error');
      return;
    }

    if (!this.oobCode) {
      this.showMessage('Invalid or missing password reset code.', 'error');
      return;
    }

    this.isProcessing = true;
    const auth = getAuth();

    const timeout = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 10000)
    );

    Promise.race([
      confirmPasswordReset(auth, this.oobCode, this.newPassword),
      timeout,
    ])
      .then(() => {
        this.showMessage(
          'Your password has been reset successfully. Redirecting you to the app…',
          'success'
        );
        this.success = true;
        this.newPassword = '';
        this.confirmPassword = '';
        this.isProcessing = false;
        setTimeout(() => {
          window.location.href = 'sollapp://login';
        }, 3000);
      })
      .catch((error) => {
        console.error('Password reset error:', error);
        this.isProcessing = false;
        if (error.message === 'Timeout') {
          this.showMessage(
            'The password reset process took too long. Please check your internet connection or try again later.',
            'error'
          );
        } else {
          this.handleFirebaseError(error);
        }
      });
  }

  handleFirebaseError(error: any): void {
    console.error('Firebase error caught:', error);
    this.isProcessing = false;

    if (!error || !error.code) {
      this.showMessage(
        'An unexpected error occurred. Please try again later.',
        'error'
      );
      return;
    }

    const errorCode = error.code;

    switch (errorCode) {
      case 'auth/expired-action-code':
        this.isExpiredLink = true;
        this.showMessage(
          'This reset link has expired. Please request a new one.',
          'warning'
        );
        break;

      case 'auth/invalid-action-code':
        this.isExpiredLink = true;
        this.showMessage(
          'This reset link is invalid or has already been used.',
          'error'
        );
        break;

      case 'auth/missing-oob-code':
        this.showMessage(
          'Invalid request: missing verification code. Please try again.',
          'error'
        );
        break;

      case 'auth/weak-password':
        this.showMessage(
          'Your new password is too weak. Please choose a stronger one.',
          'error'
        );
        break;

      case 'auth/user-disabled':
        this.showMessage(
          'This account has been disabled. Please contact support.',
          'error'
        );
        break;

      case 'auth/user-not-found':
        this.showMessage(
          'No user record found for this request. Please verify your email and try again.',
          'error'
        );
        break;

      case 'auth/invalid-api-key':
        this.showMessage(
          'There was a configuration issue with the authentication service. Please try again later or contact support.',
          'error'
        );
        break;

      case 'auth/network-request-failed':
        this.showMessage(
          'Network connection lost. Please check your internet connection and try again.',
          'error'
        );
        break;

      default:
        this.showMessage(
          'An unexpected error occurred while resetting your password. Please try again later.',
          'error'
        );
        break;
    }
  }

  resendVerificationEmail(): void {
    this.showMessage(
      'Redirecting you to the app to request a new verification email…',
      'warning'
    );
    window.location.href = 'sollapp://resendVerificationEmail';
  }

  showMessage(message: string, type: 'success' | 'error' | 'warning'): void {
    this.message = message;
    this.status = type;
    this.success = type === 'success';
    this.error = type === 'error';
  }
}
