import { RisultatiComponent } from './../pages/home/calendario/risultati/risultati.component';
import { CalendarioComponent } from './../pages/home/calendario/calendario.component';
import { GestioneAdminComponent } from './../pages/home/gestione-admin/gestione-admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from 'src/app/classes/guard/auth-guard';
import { DashboardComponent } from '../pages/home/dashboard/dashboard.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { PageRoutingModule } from './page-routing.module';
import { FooterComponent } from '../components/footer/footer.component';
import { AppCustomFrameworkModule } from './framework.module';
import { SharedModule } from './shared.module';
import { FormazioneComponent } from '../pages/home/formazione/formazione.component';
import { InfoUtenteComponent } from '../pages/home/info-utente/info-utente.component';
import { GestioneUtentiComponent } from '../pages/home/gestione-admin/gestione-utenti/gestione-utenti.component';
import { CalcoloVotiComponent } from '../pages/home/gestione-admin/calcolo-voti/calcolo-voti.component';
import { GestioneRoseComponent } from '../pages/home/gestione-admin/gestione-rose/gestione-rose.component';
import { GestioneSquadreComponent } from '../pages/home/gestione-admin/gestione-squadre/gestione-squadre.component';



@NgModule({
  declarations: [
    DashboardComponent, 
    FormazioneComponent, 
    SidebarComponent,
    FooterComponent,
    GestioneAdminComponent,
    CalendarioComponent,
    InfoUtenteComponent,
    GestioneUtentiComponent,
    CalcoloVotiComponent,
    RisultatiComponent,
    GestioneRoseComponent,
    GestioneSquadreComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    FormsModule,                              
    ReactiveFormsModule,
    SharedModule,
    AppCustomFrameworkModule              
  
  ],
  providers: [AuthGuard]
})
export class PageModule { }
