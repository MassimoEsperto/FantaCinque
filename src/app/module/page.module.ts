import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from 'src/app/classes/guard/auth-guard';
import { DashboardComponent } from '../pages/home/dashboard/dashboard.component';
import { DefaultPageComponent } from '../pages/home/default-page/default-page.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { PageRoutingModule } from './page-routing.module';



@NgModule({
  declarations: [DashboardComponent, DefaultPageComponent, SidebarComponent],
  imports: [
    CommonModule,
    PageRoutingModule,
    FormsModule,                              
    ReactiveFormsModule                    
  
  ],
  providers: [AuthGuard]
})
export class PageModule { }
