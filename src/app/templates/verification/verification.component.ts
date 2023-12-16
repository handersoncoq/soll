import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent {

  verificationForm!: FormGroup;
  @ViewChildren('digitInput') digitInputs!: QueryList<ElementRef>;
  errorMsg = 'Invalid code. Please try again';
  verificationSucceeds = false;

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.verificationForm = this.fb.group({
      digit1: ['', [Validators.required, Validators.pattern('\\d')]],
      digit2: ['', [Validators.required, Validators.pattern('\\d')]],
      digit3: ['', [Validators.required, Validators.pattern('\\d')]],
      digit4: ['', [Validators.required, Validators.pattern('\\d')]],
      digit5: ['', [Validators.required, Validators.pattern('\\d')]],
      digit6: ['', [Validators.required, Validators.pattern('\\d')]]
    });
  }

  onKeyUp(event: KeyboardEvent, index: number) {
    const controlName = `digit${index + 1}`;
    const nextControlName = `digit${index + 2}`;
  
    if (event.key === "Backspace" && this.verificationForm.get(controlName)?.value === '') {
      const prevControlName = `digit${index}`;
      this.focusInputAtIndex(index - 1);
      this.verificationForm.get(prevControlName)?.setValue('');
    } else if (this.verificationForm.get(controlName)?.value !== '') {
      this.focusInputAtIndex(index + 1);
    }
  
    if (this.verificationForm.get(controlName)?.value && event.key !== "Backspace") {
      this.verificationForm.get(nextControlName)?.enable({ emitEvent: false });
      this.focusInputAtIndex(index + 1);
    }
  }
  
  focusInputAtIndex(index: number) {
    if (index >= 0 && index < this.digitInputs.length) {
      const allDigits = this.digitInputs.toArray();
      const element = allDigits[index].nativeElement;
      element.focus();
      element.select();
    }
  }
  
  onSubmit() {
    if(this.verificationForm.invalid){
      this.throwError();
      return;
    }
    const verificationCode = Object.values(this.verificationForm.value).join('');
    // TODO: Send the code to the server for verification
    this.verificationSucceeds = true;
    this.navigateToHome();
  }

  throwError(){
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

  allFiledsFilled(): boolean {
    return Object.values(this.verificationForm.controls)
    .every(control => control.value !== '');
  }


  navigateToHome(){
    setTimeout(() =>{
      this.router.navigate(['home']);
    }, 1000)
  }

  resendCode(){
    console.log("Resend Code")
  }
  

}
