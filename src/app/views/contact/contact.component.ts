import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ContactService } from '../../services/contact/contact.service';
import { Message } from '../../models/message.model';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactView implements OnInit {

  public homeBtnText = 'Accueil';
  public programBtnText = 'Nos programmes';
  public isLoading = false;
  public isMessageSent = false;
  public isSendMessageFailed = false;
  public contactForm: FormGroup = new FormGroup({});

  constructor(private router: Router, private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactForm.addControl('lastName', new FormControl(null, Validators.required));
    this.contactForm.addControl('firstName', new FormControl(null, Validators.required));
    this.contactForm.addControl('email', new FormControl(null, [Validators.required, Validators.email]));
    this.contactForm.addControl('message', new FormControl(null, Validators.required));
    this.contactForm.addControl('recaptcha', new FormControl(null, Validators.required));
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
      recaptcha: this.contactForm.value.recaptcha
    };

    console.log(messageValues)

    this.contactService.postMessage(messageValues)
      .subscribe(
        (response) => {
          console.log('contact message response:', response);
          this.isLoading = false;
          if (response.success) {
            this.isMessageSent = true;
          } else {
            this.isSendMessageFailed = true;
            this.contactForm.controls.recaptcha.reset();
          }
        },
        (error) => {
          this.isLoading = false;
          this.isSendMessageFailed = true;
          this.contactForm.controls.recaptcha.reset();
        });
  }

  public onNavigateHome(event: Event): void {
    this.router.navigateByUrl('/accueil');
  }

  public onNavigatePrograms(event: Event): void {
    this.router.navigateByUrl('/programmes');
  }

  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }
}
