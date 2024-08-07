import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from './customValidators';
import { routeAnimationState } from '../../../../shared/route.animation';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
  animations: [routeAnimationState],
})
export class ChangePasswordComponent implements OnInit {
  constructor(private _route: Router) {}
  @HostBinding('@routeAnimationTrigger') routeAnimation = true;
  myForm!: FormGroup;
  submited: boolean = false;
  ngOnInit(): void {
    this.myForm = new FormGroup(
      {
        currentPassword: new FormControl(null, Validators.required),
        newPassword: new FormControl(null, [
          Validators.required,
          CustomValidators.passWordValidator(),
        ]),
        confirmNewPassword: new FormControl(null, Validators.required),
      },
      { validators: CustomValidators.matchPassword }
    );
  }
  loading() {
    setTimeout(() => {
      this.submited = false;
      this._route.navigate(['/login/loginForm']);
    }, 3000);
  }
  submitForm() {
    console.log(this.myForm);
    this.submited = true;
    this.loading();
  }
}
