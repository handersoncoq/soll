import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { CharMap } from 'src/app/interaces/CharMap';
import { ContentManagerService } from 'src/app/services/content-manager/content-manager.service';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss']
})
export class GetStartedComponent implements OnInit{

  registrationForm!: FormGroup;
  formHasError = true;
  appLogo!: string;

  currentStep = 1;

  constructor(private formBuilder: FormBuilder, private contentManagerService: ContentManagerService) {
    this.appLogo = this.contentManagerService.getAppLogo6();
   }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', [Validators.required, this.validateAge]],
      phone: ['', [Validators.required, this.validatePhoneNumber]],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]]
    });

    this.registrationForm.get('phone')?.valueChanges.subscribe(value => {
      const formatted = this.formatPhoneNumber(value);
      if (formatted !== value) {
        this.registrationForm.get('phone')?.setValue(formatted, { emitEvent: false });
      }
    });
  }

  validateAge(control: AbstractControl): { [key: string]: any } | null {
    if (control.value) {
      const eighteenYearsAgo = moment().subtract(18, 'years');
      const birthdate = moment(control.value);
      return birthdate.isBefore(eighteenYearsAgo) ? null : { 'ageInvalid': true };
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
  

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form Data: ', this.registrationForm.value);
      // Handle form submission here
    } else {
      console.log('Form is not valid.');
    }
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

}
