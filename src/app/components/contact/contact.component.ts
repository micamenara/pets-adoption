import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../../services/pet.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  isModalActive: boolean;
  canGenerateContact: boolean;
  petId: string;
  title: string;

  public contactForm = new FormGroup({
    phone: new FormControl(),
    fb: new FormControl(),
    description: new FormControl(),
  });

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _petService: PetService
  ) {
   }

  ngOnInit() {
    this.isModalActive = false;
    this.canGenerateContact = false;
    this.contactForm.setValidators(this.contactFormValidation());

    this._activatedRoute.queryParams.subscribe(params => {
      if (params['petId']) {
        this.petId = params['pet'];
      }
      if (params['name']) {
        this.title = `Formulario de contacto: ${params['name']}`;
      }
    });
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
