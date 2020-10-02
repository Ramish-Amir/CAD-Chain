import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';

import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {NavigationBarComponent} from './navigation-bar/navigation-bar.component';
import {FooterComponent} from './footer/footer.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {CarouselComponent} from './carousel/carousel.component';
import {appRoutes} from './app-routing.module';
import {RouterModule, Routes} from '@angular/router';
import {NgSelectModule} from '@ng-select/ng-select';
import {BuyCryptoComponent} from './buy-crypto/buy-crypto.component';
import {HttpClientModule} from '@angular/common/http';
import {BuyIdComponent} from './buy-id/buy-id.component';
import {CountdownModule} from 'ngx-countdown';
import {ErrorDialogComponent} from './error-dialog/error-dialog.component';
import {AuthService} from './Services/auth.service';
import {AuthGuard} from './Guards/auth.guard';
import { HistoryComponent } from './history/history.component';
import {SecurityService} from './Services/security.service';


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
    BuyIdComponent,
    ErrorDialogComponent,
    HistoryComponent
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
    HttpClientModule,
    CountdownModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService, AuthGuard, SecurityService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
