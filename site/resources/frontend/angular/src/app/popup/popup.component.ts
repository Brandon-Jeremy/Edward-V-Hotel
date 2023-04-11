import { Component, Input, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { LoginFormComponent } from '../login-form/login-form.component';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @ViewChild('popupOverlay') popupOverlay!: any;
  @ViewChild('popupContent') popupContent!: TemplateRef<any>;
  @ViewChild(LoginFormComponent) loginForm!: ElementRef;
  @ViewChild(SignUpFormComponent) signUpForm!: ElementRef;
  @Input() title = '';
  isOpen = false;

  constructor() { }

  openPopup(): void {
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closePopup(): void {
    this.isOpen = false;
    document.body.style.overflow = 'auto';
  }

  openLoginForm(): void {
    this.loginForm.nativeElement.clearForm();
    this.popupContent = this.loginForm.nativeElement.templateRef;
    this.openPopup();
  }

  openSignUpForm(): void {
    this.signUpForm.nativeElement.clearForm();
    this.popupContent = this.signUpForm.nativeElement.templateRef;
    this.openPopup();
  }
}
