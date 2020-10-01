import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {filter} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user;
  pass;
  response;
  userAlreadyExists = false;

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
      username: this.user,
      password: this.pass
    };
    this.userAlreadyExists = false;
    console.log(user);
    this.http.post('http://127.0.0.1:5000/registration', user).subscribe(
      res => {
        console.log(res);
        this.response = res;
        if (this.response.message === 'User ' + this.user + ' already exists') {
          this.userAlreadyExists = true;
          return;
        }
        if (this.response.message === 'user created') {
          console.log('User has been registered');
          this.router.navigate(['/login']);
        }
      });
  }

  constructor(private http: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
  }

}
