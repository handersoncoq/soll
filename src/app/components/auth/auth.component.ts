import { Component, OnInit } from '@angular/core';
import { getAuth, applyActionCode } from '@angular/fire/auth';

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

  ngOnInit(): void {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    const oobCode = params.get('oobCode');

    console.log('Mode:', mode);
    console.log('OOB Code:', oobCode);

    if (mode === 'verifyEmail' && oobCode) {
      const auth = getAuth();
      console.log('Auth instance:', auth);
      console.log('Firebase app options:', auth.app.options);

      applyActionCode(auth, oobCode)
        .then(() => {
          console.log('Verification success!');
          this.message =
            'We have successfully verified your email. Redirecting you to the app…';
          this.success = true;
          this.status = 'success';
          setTimeout(() => {
            window.location.href = 'soll://login';
          }, 3000);
        })
        .catch((error) => {
          console.error('Verification failed:', error);
          this.message = 'Verification link is invalid or expired.';
          this.error = true;
          this.status = 'error';
        });
    } else {
      console.warn('Invalid or missing parameters in verification URL.');
      this.message =
        "We're sorry, but this link is either invalid or has already been used.";
      this.error = true;
      this.status = 'warning';
    }
  }
}
