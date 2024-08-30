import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routeAnimationState } from '../../../../shared/route.animation';
import { AuthService } from '../../services/auth.service';
import { NotificationComponent } from './notification/notification.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [routeAnimationState],
})
export class LoginComponent implements OnInit {
  constructor(private _route: Router, private auth: AuthService) {}
  @HostBinding('@routeAnimationTrigger') routeAnimation = true;
  myForm!: FormGroup;
  submited: boolean = false;
  errorMassege = '';
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
      this._route.navigate(['/home/products']);
    }, 3000);
  }
  submitForm() {
    this.submited = true;
    this.auth
      .login(this.myForm.value.email, this.myForm.value.password)
      .subscribe({
        next: () => {
          this._route.navigate(['/products']);
        },
        error: (error) => (this.errorMassege = error.message),
      });
    this.showToast();

    this.loading();
  }
  @ViewChild('toast') toast!: NotificationComponent;

  showToast() {
    this.toast.show();
  }
}
