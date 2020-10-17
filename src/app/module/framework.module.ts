import {NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


const modules = [
  MDBBootstrapModule.forRoot()
    ]

@NgModule({
  imports: [modules],
  exports: [modules],
  declarations: [],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppCustomFrameworkModule { }