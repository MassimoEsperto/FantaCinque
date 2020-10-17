import { CalendarioComponent } from './../pages/home/calendario/calendario.component';
import { GestioneAdminComponent } from './../pages/home/gestione-admin/gestione-admin.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/classes/guard/auth-guard';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { DashboardComponent } from '../pages/home/dashboard/dashboard.component';
import { FormazioneComponent } from '../pages/home/formazione/formazione.component';
import { InfoUtenteComponent } from '../pages/home/info-utente/info-utente.component';



const routes: Routes = [
    {
        path: 'home',
        component: SidebarComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'gestione-admin',
                component: GestioneAdminComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'formazione',
                component: FormazioneComponent
            },
            {
                path: 'calendario',
                component: CalendarioComponent
            },
            {
                path: 'info-utente',
                component: InfoUtenteComponent
            }
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
