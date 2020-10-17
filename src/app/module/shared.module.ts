
import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MyAlertComponent } from '../components/my-alert/my-alert.component';
import { MyButtonComponent } from '../components/my-button/my-button.component';
import { MySpinnerComponent } from '../components/my-spinner/my-spinner.component';
import { AppCustomFrameworkModule } from './framework.module';


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
    MySpinnerComponent
  ],
  exports: [
    MyButtonComponent,
    MyAlertComponent,
    MySpinnerComponent
  ],
  providers: [
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
