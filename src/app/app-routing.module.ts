import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { OtpformComponent } from './sign-up/otpform/otpform.component';
import { LocationStrategy } from '@angular/common';
import { LoginComponent } from './sign-up/login/login.component';
import { ChangePasswordComponent } from './sign-up/change-password/change-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  {
    path: 'login',
    component: SignUpComponent,
    children: [
      { path: 'loginForm', component: LoginComponent },
      { path: 'otp', component: OtpformComponent },
      { path: 'changePassword', component: ChangePasswordComponent },
    ],
  },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/login/loginForm', pathMatch: 'full' },
];

@NgModule({
  imports: [BrowserAnimationsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
