import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routeAnimationState } from '../../../../shared/route.animation';

@Component({
  selector: 'app-otpform',
  templateUrl: './otpform.component.html',
  styleUrl: './otpform.component.css',
  animations: [routeAnimationState],
})
export class OtpformComponent implements OnInit {
  constructor(private _route: Router) {}
  @HostBinding('@routeAnimationTrigger') routeAnimation = true;
  form!: FormGroup;
  submited: boolean = false;
  ngOnInit(): void {
    this.form = new FormGroup({
      code1: new FormControl(null, [Validators.required]),
      code2: new FormControl(null, [Validators.required]),
      code3: new FormControl(null, [Validators.required]),
      code4: new FormControl(null, [Validators.required]),
    });
  }
  submitForm() {
    console.log(this.form);
    this.loading();
  }
  loading() {
    this.submited = !this.submited;
    setTimeout(() => {
      this.submited = !this.submited;
      this._route.navigate(['./login/changePassword']);
    }, 3000);
  }
  move(e: any, p: any, c: any, n: any) {
    let length = c.value.length;
    let maxLength = c.getAttribute('maxlength');
    if (length == maxLength) {
      if (n != '') {
        n.focus();
      }
    }
    if (e.key === 'Backspace') {
      if (p != '') {
        p.focus();
      }
    }
  }
}
