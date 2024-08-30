import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';

import { LocationStrategy } from '@angular/common';
import { LoginComponent } from './sign-up/login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AboutpageComponent } from './home/aboutpage/aboutpage.component';
import { ContactsComponent } from './home/contacts/contacts.component';

import { ProductComponent } from './home/product/product.component';
import { BranchesComponent } from './home/branches/branches.component';

const routes: Routes = [
  {
    path: 'login',
    component: SignUpComponent,
    children: [{ path: 'loginForm', component: LoginComponent }],
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'products', component: ProductComponent },
      { path: 'aboutpage', component: AboutpageComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'branches', component: BranchesComponent },
    ],
  },
  { path: 'home', redirectTo: '/products', pathMatch: 'full' },
  { path: '', redirectTo: '/login/loginForm', pathMatch: 'full' },
];

@NgModule({
  imports: [BrowserAnimationsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
