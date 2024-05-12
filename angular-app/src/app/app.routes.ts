import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {FormComponent} from "./form/form.component";
import {LoginComponent} from "./login/login.component";
import {AdminComponent} from "./admin/admin.component";
import {RegisterComponent} from "./register/register.component";
import {authGuard} from "./auth.guard";
import {FormListComponent} from "./form-list/form-list.component";
import {WelcomeComponent} from "./welcome/welcome.component";
import {adminGuard} from "./admin.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [adminGuard],
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
