import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { differenceInYears, parseISO } from 'date-fns';
import { EmailJustificationComponent } from 'src/app/info/components/email-justification/email-justification.component';
import { PhoneAgreementComponent } from 'src/app/info/components/phone-agreement/phone-agreement.component';
import { CharMap } from 'src/app/interaces/CharMap';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';
import { PublicInteractionService } from 'src/app/services/public-interaction/public-interaction.service';
import { successMessage } from 'src/app/utils/constants/GetStartedSuccessMsg';
import { states } from 'src/app/utils/constants/UsStates';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent implements OnInit{

  @ViewChild('getStartedTop') getStartedTop!: ElementRef;

  registrationForm!: FormGroup;
  formHasError = true;
  appLogo!: string;
  checkPhoneAgr = false;
  currentStep = 1;
  hidePassword = true;
  successMessage = successMessage;
  enterAnimationDuration = '400ms';
  exitAnimationDuration = '200ms';
  usStates = states;

  constructor(private formBuilder: FormBuilder, private contentManagerService: ContentManagerService, 
    private dialog: MatDialog, private publicInteractionService: PublicInteractionService) {
    this.appLogo = this.contentManagerService.getAppLogo6();
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@(gmail\\.com|yahoo\\.com|outlook\\.com|aol\\.com|icloud\\.com)$')]],
      dob: ['', [Validators.required, this.validateAge]],
      phone: ['', [Validators.required, this.validatePhoneNumber]],
      acceptPhoneAgr: [false, Validators.requiredTrue],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&\\-_])[A-Za-z\\d@$!%*?&\\-_]{8,}$')]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });
   }

  ngOnInit() {
    this.scrollToTop();
    const email = this.publicInteractionService.getEmail();
    if (email) {
      this.registrationForm.get('email')?.setValue(email);
      this.registrationForm.get('email')?.markAsDirty();
      this.registrationForm.get('email')?.updateValueAndValidity();
    }

    this.registrationForm.get('phone')?.valueChanges.subscribe(value => {
      const formatted = this.formatPhoneNumber(value);
      if (formatted !== value) {
        this.registrationForm.get('phone')?.setValue(formatted, { emitEvent: false });
      }
    });
    
  }


  scrollToTop(){
    window.scroll({
      top: 0,
      behavior: 'smooth'})
  }

  scrollBackToTop(){
    if(this.getStartedTop)
    this.getStartedTop.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  togglePasswordVisibility(){
    this.hidePassword = !this.hidePassword;
  }

validateAge(control: AbstractControl): { [key: string]: boolean } | null {
  const value = control.value;
  if (value) {
    let birthdate: Date;
    
    if (typeof value === 'string') {
      birthdate = parseISO(value);
      if (isNaN(birthdate.getTime())) {
        return { 'dateInvalid': true };
      }
    } else {
      birthdate = value;
    }

    if (differenceInYears(new Date(), birthdate) < 18) {
      return { 'ageInvalid': true };
    }
  }
  return null;
}


  validatePhoneNumber(control: AbstractControl): { [key: string]: any } | null {
    const pattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return pattern.test(control.value) ? null : { 'phoneInvalid': true };
  }

  formatPhoneNumber(value: string): string {
    const numbers = value.replace(/\D/g, '');
    const char: CharMap = {0: '(', 3: ') ', 6: '-'};
    let formatted = '';
  
    for (let i = 0; i < numbers.length; i++) {
      formatted += (char[i] || '') + numbers[i];
    }
  
    return formatted;
  }
  
  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confirmPassword'].value ? null : {'mismatch': true};
  }

  hasLowerCase(value: string): boolean {
  return /[a-z]/.test(value);
  }

  hasUpperCase(value: string): boolean {
    return /[A-Z]/.test(value);
  }

  hasNumber(value: string): boolean {
    return /\d/.test(value);
  }

  hasSpecialCharacter(value: string): boolean {
    return /[@$!%*?&]/.test(value);
  }


  onSubmit() {
    if (this.registrationForm.valid) {
      // console.log('Form Data: ', this.registrationForm.value);
      console.info('form is valid: ', this.registrationForm.valid);
      this.nextStep();
      this.showSpinner();
      this.scrollBackToTop();
    }
  }

  showSpinner(){
    setTimeout(() =>{
      this.nextStep();
      }, 1000)
  }

  nextStep() {
    if (this.currentStep < 6) {
      this.currentStep++;
    }
    this.scrollBackToTop()
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
    this.scrollBackToTop()
  }

  isStep1Valid(frm: FormGroup): boolean {
    return frm.controls['firstName'].valid &&
    frm.controls['lastName'].valid &&
    frm.controls['email'].valid;
  }

  isStep2Valid(frm: FormGroup): boolean {
    return frm.controls['dob'].valid &&
    frm.controls['phone'].valid &&
    frm.controls['acceptPhoneAgr'].valid;
  }

  isStep3Valid(frm: FormGroup): boolean {
    return frm.controls['street'].valid &&
          frm.controls['city'].valid &&
          frm.controls['state'].valid &&
          frm.controls['zipcode'].valid;
  }

  isStep4Valid(frm: FormGroup): boolean {
    return frm.controls['password'].valid &&
           (frm.controls['confirmPassword'].valid && !frm.errors?.['mismatch']) &&
           frm.controls['acceptTerms'].valid;
  }
  
  
  openEmailJustification(): void {
    this.dialog.open(EmailJustificationComponent,
      {
        width: '100%',
        enterAnimationDuration: this.enterAnimationDuration,
        exitAnimationDuration: this.exitAnimationDuration,
      })
  }
  
  openPhoneAgr(): void {
    this.dialog.open(PhoneAgreementComponent,
      {
        width: '100%',
        enterAnimationDuration: this.enterAnimationDuration,
        exitAnimationDuration: this.exitAnimationDuration,
      })
  }

  openTermsAndConditions(): void {
    this.contentManagerService.openTermsAndConditions();
  }

}
