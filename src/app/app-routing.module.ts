import { NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {BuyCryptoComponent} from './buy-crypto/buy-crypto.component';
import {BuyIdComponent} from './buy-id/buy-id.component';
import {AuthGuard} from './Guards/auth.guard';
import {HistoryComponent} from './history/history.component';
import {AppComponent} from './app.component';

export const appRoutes: Routes = [
  { path: 'home', component: LandingPageComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'login' , component: LoginComponent},
  { path: 'signup' , component: SignupComponent},
  { path: 'exchange' , component: BuyCryptoComponent},
  { path: 'exchange/:id', component: BuyIdComponent, canActivate: [AuthGuard]},
  { path: 'history', component: HistoryComponent, canActivate: [AuthGuard]}
];
