import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';

import { LoginComponent } from './sign-up/login/login.component';

import { SidebarComponent } from './home/sidebar/sidebar.component';

import { AboutpageComponent } from './home/aboutpage/aboutpage.component';
import { ContactsComponent } from './home/contacts/contacts.component';

import { provideHttpClient } from '@angular/common/http';

import { ProductComponent } from './home/product/product.component';
import { NotificationComponent } from './home/product/notification/notification.component';
import { NotificationAboutComponent } from './home/aboutpage/notification-about/notification-about.component';
import { BranchesComponent } from './home/branches/branches.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HomeComponent,

    LoginComponent,

    SidebarComponent,

    AboutpageComponent,
    ContactsComponent,

    ProductComponent,
    NotificationComponent,
    NotificationAboutComponent,
    BranchesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [provideClientHydration(), provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
