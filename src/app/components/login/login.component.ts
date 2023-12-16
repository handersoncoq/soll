import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { CharMap } from 'src/app/interaces/CharMap';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';
import { SnackBarComponent } from 'src/app/templates/snack-bar/snack-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  isMobile!: boolean;
  loginForm!: FormGroup;
  formHasError = true;
  appLogo!: string;
  checkPhoneAgr = false;
  errorMsg = 'Wrong credentials! Please try again';
  currentStep = 1;
  hidePassword = true;

  constructor(private formBuilder: FormBuilder, private contentManagerService: ContentManagerService, private snackBar: MatSnackBar) {
    this.appLogo = this.contentManagerService.getAppLogo6();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      acceptPhoneAgr: [false, Validators.requiredTrue],
      verificationCode: ['', [Validators.required]]
    });
   }

  ngOnInit() {}

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  nextStep() {
    if(!this.validateEmailDomain(this.loginForm.controls['email'].value)){
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: {
          message: this.errorMsg,
          type: 'error'
        },
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
    }
    else this.currentStep++;
  }

  validateEmailDomain(email: string): boolean{
    const emailRegex = new RegExp('^[a-zA-Z0-9._%+-]+@(gmail\\.com|yahoo\\.com|outlook\\.com|aol\\.com|icloud\\.com)$');
    return emailRegex.test(email);
  }

  isStep1Valid(frm: FormGroup): boolean {
    return frm.controls['email'].valid &&
    frm.controls['password'].valid &&
    frm.controls['acceptPhoneAgr'].valid;
  }

  isStep2Valid(frm: FormGroup): boolean {
    return frm.controls['dob'].valid &&
    frm.controls['phone'].valid &&
    frm.controls['acceptPhoneAgr'].valid;
  }
  

}
