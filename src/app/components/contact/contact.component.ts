import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  isModalActive: boolean;
  canGenerateContact: boolean;

  public contactForm = new FormGroup({
    phone: new FormControl(),
    fb: new FormControl(),
    description: new FormControl(),
  });

  constructor() {
   }

  ngOnInit() {
    this.isModalActive = false;
    this.canGenerateContact = false;
    this.contactForm.setValidators(this.contactFormValidation());
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }

  processForm() {
  }

  private contactFormValidation(): ValidatorFn {
    return (): ValidationErrors => {
      if (this.contactForm.controls['phone'].value &&
        this.contactForm.controls['description'].value) {
        this.canGenerateContact = true;
        this.contactForm.setErrors(null);
      } else {
        this.canGenerateContact = false;
        this.contactForm.setErrors({error: 'error'});
      }
      return;
    };
  }

}
