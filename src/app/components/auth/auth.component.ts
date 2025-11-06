import { Component, OnInit } from '@angular/core';
import { getAuth, applyActionCode } from '@angular/fire/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  message = 'Verifying your email…';
  success = false;
  error = false;
  status: 'success' | 'error' | 'warning' | null = null;

  ngOnInit(): void {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    const oobCode = params.get('oobCode');

    if (mode === 'verifyEmail' && oobCode) {
      const auth = getAuth();
      applyActionCode(auth, oobCode)
        .then(() => {
          this.message =
            'We have successfully verified your email. Redirecting you to the app…';
          this.success = true;
          this.status = 'success';
          setTimeout(() => {
            window.location.href = 'soll://login';
          }, 3000);
        })
        .catch(() => {
          this.message = 'Verification link is invalid or expired.';
          this.error = true;
          this.status = 'error';
        });
    } else {
      this.message =
        "We're sorry, but this link is either invalid or has already been used.";
      this.error = true;
      this.status = 'warning';
    }
  }
}
