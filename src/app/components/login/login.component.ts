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
  currentStep = 1;

  constructor(private formBuilder: FormBuilder, private contentManagerService: ContentManagerService, private snackBar: MatSnackBar) {
    this.appLogo = this.contentManagerService.getAppLogo6();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      acceptPhoneAgr: [false, Validators.requiredTrue],
      verificationCode: ['', [Validators.required]]
    });
   }

  ngOnInit() {

    this.loginForm.get('phone')?.valueChanges.subscribe(value => {
      const formatted = this.formatVerificationCode(value);
      if (formatted !== value) {
        this.loginForm.get('phone')?.setValue(formatted, { emitEvent: false });
      }
    });

    this.loginForm.get('verificationCode')?.valueChanges.subscribe(value => {
      if (value && value.length > 9) {
        this.loginForm.get('verificationCode')?.setValue(value.substr(0, 11), { emitEvent: false });
      }
    });
    
  }


  formatVerificationCode(value: string): string {
    const numbers = value.replace(/\D/g, '');
    const char: CharMap = {0: '', 3: '-'};
    let formatted = '';
  
    for (let i = 0; i < numbers.length; i++) {
      formatted += (char[i] || '') + numbers[i];
    }
  
    return formatted;
  }

  nextStep() {
    if(!this.validateEmailDomain(this.loginForm.controls['email'].value)){
      const errorMsg = 'Ooh, you may have entered the wrong credentials! Please try again';
      this.snackBar.openFromComponent(SnackBarComponent, {
        data: {
          message: errorMsg,
          type: 'error'
        },
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
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
