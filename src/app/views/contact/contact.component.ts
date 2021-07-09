import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ContactService } from '../../services/contact/contact.service';
import { Message } from '../../models/message.model';
// import {
//   routeStateFadeInTrigger,
//   slideInAnimation,
// } from '../../animations/route-animations';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  // animations: [routeStateFadeInTrigger, slideInAnimation],
})
export class ContactView implements OnInit {
  // @HostBinding('@routeAnimations') routeAnimation = true;

  public homeBtnText = 'Accueil';
  public programBtnText = 'Nos programmes';
  public isLoading = false;
  public isMessageSent = false;
  public isSendMessageFailed = false;
  public contactForm: FormGroup = new FormGroup({});

  constructor(private router: Router, private contactService: ContactService) {}

  ngOnInit(): void {
    this._initContactForm();
  }

  public onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }
    this.isLoading = true;
    const messageValues: Message = {
      lastName: this.contactForm.value.lastName,
      firstName: this.contactForm.value.firstName,
      email: this.contactForm.value.email,
      messageContent: this.contactForm.value.message,
    };

    this.contactService.postMessage(messageValues).subscribe(
      (response) => {
        console.log('contact message response:', response);
        this.isLoading = false;
        this.isMessageSent = true;
      },
      (error) => {
        this.isLoading = false;
        this.isSendMessageFailed = true;
        console.log('error:', error);
      }
    );
  }

  public onNavigateHome(event: Event): void {
    this.router.navigateByUrl('/accueil');
  }

  public onNavigatePrograms(event: Event): void {
    this.router.navigateByUrl('/programmes');
  }

  private _initContactForm(): void {
    this.contactForm.addControl(
      'lastName',
      new FormControl(null, Validators.required)
    );
    this.contactForm.addControl(
      'firstName',
      new FormControl(null, Validators.required)
    );
    this.contactForm.addControl(
      'email',
      new FormControl(null, [Validators.required, Validators.email])
    );
    this.contactForm.addControl(
      'message',
      new FormControl(null, Validators.required)
    );
  }
}
