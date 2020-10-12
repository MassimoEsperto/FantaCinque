
import {NgModule} from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


const modules = [
  MDBBootstrapModule.forRoot()
    ]

@NgModule({
  imports: [modules],
  exports: [modules],
  declarations: []
})
export class AppCustomFrameworkModule { }