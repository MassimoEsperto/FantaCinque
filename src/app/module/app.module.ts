import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShowCaseComponent } from '../pages/other/show-case/show-case.component';
import { ErrorPageComponent } from '../pages/other/error-page/error-page.component';
import { PresentationComponent } from '../pages/other/presentation/presentation.component';
import { SignInComponent } from '../pages/login/sign-in/sign-in.component';
import { RegisterComponent } from '../pages/login/register/register.component';
import { RecuperaPasswordComponent } from '../pages/login/recupera-password/recupera-password.component';
import { PageModule } from './page.module';
import { AppCustomFrameworkModule } from './framework.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ShowCaseComponent,
    ErrorPageComponent,
    PresentationComponent,
    SignInComponent,
    RegisterComponent,
    RecuperaPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PageModule,
    AppCustomFrameworkModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
