import {Component, OnInit} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  countries = ['United Kingdom', 'Pakistan', 'Canada', 'China', 'Korea', 'Vietnam', 'Brazil', 'Russia', 'Albania', 'Algeria', 'Angola', 'Argentina',
    'Armenia', 'Australia', 'Austria', 'Bahrain', 'Belgium', 'Bermuda', 'Bhutan', 'Cyprus', 'Combodia', 'Columbia'];
  public selectedCountry;
  // public selectedSignupOption = 'email';
  public isEmailActive = true;
  public emailClass = 'active';
  public phoneClass = 'inactive';
  // private txtValue: string;
  // myFunction() {
  //   document.getElementById('myDropdown').classList.toggle('show');
  // }
  //
  // filterFunction() {
  //   let input;
  //   // filter;
  //   let ul;
  //   li, a, i;
  //   input = document.getElementById('myInput');
  //   filter = input.value.toUpperCase();
  //   div = document.getElementById('myDropdown');
  //   a = div.getElementsByTagName('a');
  //   let i: number;
  //   for (i = 0; i < a.length; i++) {
  //     this.txtValue = a[i].textContent || a[i].innerText;
  //     if (this.txtValue.toUpperCase().indexOf(filter) > -1) {
  //       a[i].style.display = '';
  //     } else {
  //       a[i].style.display = 'none';
  //     }
  //   }
  // }


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
