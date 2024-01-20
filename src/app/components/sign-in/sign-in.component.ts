import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhoneAgreementComponent } from 'src/app/info/components/phone-agreement/phone-agreement.component';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';
import { SnackBarComponent } from 'src/app/templates/snack-bar/snack-bar.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit{

  @ViewChild('signInTop') signInTop!: ElementRef;

  isMobile!: boolean;
  loginForm!: FormGroup;
  formHasError = true;
  appLogo!: string;
  checkPhoneAgr = false;
  errorMsg = 'Wrong credentials! Please try again';
  currentStep = 1;
  hidePassword = true;
  credialsAreValid = false;
  enterAnimationDuration = '400ms';
  exitAnimationDuration = '200ms';

  constructor(private formBuilder: FormBuilder, private contentManagerService: ContentManagerService, 
    private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.appLogo = this.contentManagerService.getAppLogo6();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      acceptPhoneAgr: [false, Validators.requiredTrue],
      verificationCode: ['', [Validators.required]]
    });
   }

  ngOnInit() {
    this.scrollToTop()
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

  nextStep(event: Event) {
    event.preventDefault();
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
    else this.toVerification();
  }

  toVerification(){
    this.credialsAreValid = true;
      setTimeout(() =>{
        this.credialsAreValid = false;
      }, 1000);
      setTimeout(() =>{
        this.currentStep++;
        this.scrollBackToTop();
      }, 1000);
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

  openPhoneAgr(): void {
    this.dialog.open(PhoneAgreementComponent,
      {
        width: '100%',
        enterAnimationDuration: this.enterAnimationDuration,
        exitAnimationDuration: this.exitAnimationDuration,
      })
  }


  scrollToTop(){
    window.scroll({
      top: 0,
      behavior: 'smooth'})
  }

  scrollBackToTop(){
    if(this.signInTop){
    this.signInTop.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  }

  

}