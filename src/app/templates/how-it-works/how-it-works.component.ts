import { Component, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { howItWorksSteps } from 'src/app/utils/constants/HowItWorks';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss'
})
export class HowItWorksComponent {

  @ViewChild('stepper') stepper!: MatStepper;
  steps = howItWorksSteps

  activateStep(index: number) {
    if (this.stepper && this.stepper.selectedIndex !== index) {
      this.stepper.selectedIndex = index;
      // Call any additional logic if needed
    }
  }

}
