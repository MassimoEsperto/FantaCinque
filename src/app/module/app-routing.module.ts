import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecuperaPasswordComponent } from '../pages/login/recupera-password/recupera-password.component';
import { RegisterComponent } from '../pages/login/register/register.component';
import { SignInComponent } from '../pages/login/sign-in/sign-in.component';
import { PresentationComponent } from '../pages/other/presentation/presentation.component';
import { ShowCaseComponent } from '../pages/other/show-case/show-case.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: PresentationComponent,
        data: { animation: 'AboutPage' }
    },
    {
        path: 'sign-in',
        component: SignInComponent,
        data: { animation: 'FilterPage' }
    },
    {
        path: 'register',
        component: RegisterComponent,
        data: { animation: 'AboutPage' }
    },
    {
        path: 'recupera-password',
        component: RecuperaPasswordComponent,
        data: { animation: 'HomePage' }
    },
    {
        path: 'show-case',
        component: ShowCaseComponent,
        data: { animation: 'HomePage' }
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
