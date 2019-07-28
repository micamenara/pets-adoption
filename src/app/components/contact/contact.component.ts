import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdoptionRequestService } from '../../services/adoption-request.service';
import { IAdoptionRequest } from '../../interfaces/adoptionRequest';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

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
  adoptionRequest = {} as IAdoptionRequest;

  public contactForm = new FormGroup({
    phone: new FormControl(),
    fb: new FormControl(),
    description: new FormControl(),
  });

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _adoptionRequestService: AdoptionRequestService,
    private _userService: UserService
  ) {
    this._activatedRoute.queryParams.subscribe(params => {
      if (params['pet']) {
        this.petId = params['pet'];
      }
      if (params['name']) {
        this.title = `Formulario de contacto: ${params['name']}`;
      }
    });
  }

  ngOnInit() {
    this.isModalActive = false;
    this.canGenerateContact = false;
    this.contactForm.setValidators(this.contactFormValidation());
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
    this._router.navigate(['/pets']);
  }

  processForm() {
    this.adoptionRequest = {
      ...this.adoptionRequest,
      description: this.contactForm.controls['description'].value,
      fblink: this.contactForm.controls['fb'].value,
      phone: this.contactForm.controls['phone'].value,
      petId: this.petId,
      userId: this._userService.getUserLoggedIn()._id
    };
    this._adoptionRequestService.createAdoptionRequest(this.adoptionRequest).subscribe(
      response => {
      },
      err => {
        console.log(err);
      });
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
