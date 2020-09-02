import { NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {BuyCryptoComponent} from './buy-crypto/buy-crypto.component';

export const appRoutes: Routes = [
  { path: 'home', component: LandingPageComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'login' , component: LoginComponent},
  { path: 'signup' , component: SignupComponent},
  { path: 'buy' , component: BuyCryptoComponent}
];
