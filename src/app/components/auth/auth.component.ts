import { Component, OnInit } from '@angular/core';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, applyActionCode } from 'firebase/auth';
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

  handleVerification(mode: string | null, oobCode: string | null): void {
    if (mode === 'verifyEmail' && oobCode) {
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
            window.location.href = 'soll://login';
          }, 3000);
        })
        .catch((error) => {
          const errorCode = (error as any).code;
          switch (errorCode) {
            case 'auth/expired-action-code':
              this.isExpiredLink = true;
              this.showMessage(
                'This verification link has expired. You can request a new one below.',
                'warning'
              );
              break;
            case 'auth/invalid-action-code':
              this.isExpiredLink = false;
              this.showMessage(
                'This verification link is invalid or has already been used.',
                'error'
              );
              break;
            case 'auth/user-disabled':
              this.isExpiredLink = false;
              this.showMessage(
                'This account has been disabled. Please contact support.',
                'error'
              );
              break;
            case 'auth/user-not-found':
              this.isExpiredLink = false;
              this.showMessage(
                'The account linked to this verification no longer exists.',
                'error'
              );
              break;
            default:
              this.isExpiredLink = false;
              this.showMessage(
                'Something went wrong on our end. Please try again later.',
                'error'
              );
              break;
          }
        });
    } else {
      this.showMessage(
        "We're sorry, but this link is either invalid or has already been used.",
        'error'
      );
    }
  }

  resendVerificationEmail(): void {
    this.showMessage(
      'Redirecting you to the app to request a new verification email…',
      'warning'
    );
    window.location.href = 'soll://resendVerificationEmail';
  }

  showMessage(message: string, type: 'success' | 'error' | 'warning'): void {
    this.message = message;
    this.status = type;
    this.success = type === 'success';
    this.error = type === 'error';
  }
}
