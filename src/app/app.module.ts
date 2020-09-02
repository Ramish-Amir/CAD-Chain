
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CarouselComponent } from './carousel/carousel.component';
import { appRoutes } from './app-routing.module';
import {RouterModule, Routes} from '@angular/router';
import {NgSelectModule} from '@ng-select/ng-select';
import { BuyCryptoComponent } from './buy-crypto/buy-crypto.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavigationBarComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    CarouselComponent,
    BuyCryptoComponent,
  ],
  entryComponents: [
    LandingPageComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MDBBootstrapModule,
        FormsModule,
        RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'}),
        NgSelectModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
