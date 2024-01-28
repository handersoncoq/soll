import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/interaces/Group';
import { GroupService } from 'src/app/services/group-service/group.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ScreenLayoutService } from 'src/app/utils/screen-layout/screen-layout.service';

@Component({
  selector: 'app-payment-container',
  templateUrl: './payment-container.component.html',
  styleUrl: './payment-container.component.scss'
})
export class PaymentContainerComponent implements OnInit{

  isMobile = true;
  contributionForm!: FormGroup;
  group!: Group;

  constructor(private screenService: ScreenLayoutService, private formBuilder: FormBuilder,
    private paymentService: PaymentService, private route: ActivatedRoute, private groupService: GroupService) { 
    this.screenService.isMobile$.subscribe(
      isMobile =>{
        this.isMobile = isMobile;
      })
      this.group = this.groupService.foundGroup;
}

  ngOnInit(): void {
    this.createForm();
  }


  createForm(): void {
    this.contributionForm = this.formBuilder.group({
      groupName: [{value: this.group.groupName, disabled: true}, Validators.required],
      contributionAmount: [{value: this.formatAmount(), disabled: true}, [Validators.required]],
      paymentMethod: ['blank'],
      note: ['']
    });
  }


  formatAmount(): string {
    let amount = this.group.contribution
    return `$ ${parseFloat(amount.toString()).toFixed(2)}`;
  }

  onSubmit(): void {
    if (this.contributionForm.valid) {
      console.log('Form Value:', this.contributionForm.value);
    }
  }

  closeBottomSheet(){
    if(!this.isMobile) return;
    this.paymentService.closeBottomSheet();
  }

}
