import { MyModalValidateComponent } from './../components/my-modal-validate/my-modal-validate.component';

import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MyAlertComponent } from '../components/my-alert/my-alert.component';
import { MyButtonComponent } from '../components/my-button/my-button.component';
import { MySpinnerComponent } from '../components/my-spinner/my-spinner.component';
import { AppCustomFrameworkModule } from './framework.module';
import { MyModalInfoComponent } from '../components/my-modal-info/my-modal-info.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppCustomFrameworkModule
  ],
  declarations: [
    MyButtonComponent,
    MyAlertComponent,
    MySpinnerComponent,
    MyModalValidateComponent,
    MyModalInfoComponent
  ],
  exports: [
    MyButtonComponent,
    MyAlertComponent,
    MySpinnerComponent,
    MyModalValidateComponent,
    MyModalInfoComponent
  ],
  providers: [
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
