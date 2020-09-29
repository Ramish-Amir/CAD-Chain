import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  token;
  user;
  pass;

  countries = ['United Kingdom', 'Pakistan', 'Canada', 'China', 'Korea',
    'Vietnam', 'Brazil', 'Russia', 'Albania', 'Algeria', 'Angola', 'Argentina',
    'Armenia', 'Australia', 'Austria', 'Bahrain', 'Belgium', 'Bermuda', 'Bhutan', 'Cyprus', 'Combodia', 'Columbia'];
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

  register() {
    const user = {
      username: 'abc',
      password: 'xyz'
    };
    console.log(user);
    this.http.post('http://127.0.0.1:5000/registration', user).subscribe(
      res => {
        this.token = res;
        console.log(this.token);
        // localStorage.setItem('token', this.token.token);
        // console.log(localStorage.getItem('token'));
        // console.log('User has been logged in');
      });
  }

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

}
