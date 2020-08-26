import {Component, OnInit} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  countries = ['United Kingdom', 'Canada', 'China', 'Korea', 'Vietnam', 'Brazil', 'Russia', 'Albania', 'Algeria', 'Angola', 'Argentina',
    'Armenia', 'Australia', 'Austria', 'Bahrain', 'Belgium', 'Bermuda', 'Bhutan', 'Cyprus', 'Combodia', 'Columbia'];
  public selectedCountry;
  // public selectedSignupOption = 'email';
  public isEmailActive = true;
  public emailClass = 'active';
  public phoneClass = 'inactive';

  public changeToPhoneSignup() {
    this.isEmailActive = false;
    this.emailClass = 'inactive';
    this.phoneClass = 'active';
  }

  public changeToEmailSignup() {
    this.isEmailActive = true;
    this.phoneClass = 'inactive';
    this.emailClass = 'active';
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
