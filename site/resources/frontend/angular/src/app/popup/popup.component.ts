import { Component, Input, ViewChild, TemplateRef } from '@angular/core';
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
  @ViewChild(LoginFormComponent) loginForm!: LoginFormComponent;
  @ViewChild(SignUpFormComponent) signUpForm!: SignUpFormComponent;
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
    this.loginForm.clearForm();
    this.popupContent = this.loginForm.templateRef;
    this.openPopup();
  }

  openSignUpForm(): void {
    this.signUpForm.clearForm();
    this.popupContent = this.signUpForm.templateRef;
    this.openPopup();
  }
}
