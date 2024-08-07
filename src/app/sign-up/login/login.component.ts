import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routeAnimationState } from '../../../../shared/route.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [routeAnimationState],
})
export class LoginComponent implements OnInit {
  constructor(private _route: Router) {}
  @HostBinding('@routeAnimationTrigger') routeAnimation = true;
  myForm!: FormGroup;
  submited: boolean = false;
  ngOnInit(): void {
    this.myForm = new FormGroup({
      userName: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }
  loading() {
    setTimeout(() => {
      this.submited = false;
      this._route.navigate(['/home']);
    }, 3000);
  }
  submitForm() {
    console.log(this.myForm);
    this.submited = true;
    this.loading();
  }
}
