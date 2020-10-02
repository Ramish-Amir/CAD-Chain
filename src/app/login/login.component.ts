import {Component, OnInit} from '@angular/core';
import {AuthService} from '../Services/auth.service';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import SJCL from 'sjcl';
import {SecurityService} from '../Services/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  name;
  pass;
  response;
  invalidCredentials = false;

  loginUser() {
    const user = {
      username: this.name,
      password: this.pass
    };
    this.invalidCredentials = false;
    console.log(user);
    this.http.post('http://127.0.0.1:5000/login', user).subscribe(
      res => {
        this.response = res;
        console.log(this.response);
        if (this.response.message === 'Wrong credentials') {
          this.invalidCredentials = true;
          return;
        }
        if (this.response.message === 'Logged in as ' + this.name) {
          const data = {
            access_token: this.response.access_token,
            username: this.response.username
          };
          const encryptedData = this.secureService.encryptData(data);
          localStorage.setItem('encryptedData', encryptedData);
          console.log('E-D: ' + localStorage.getItem('encryptedData'));
          console.log(this.secureService.getDecryptedData().access_token);
          console.log(this.secureService.getDecryptedData().username);
          console.log('User has been logged in');
          this.router.navigate(['/home']);
        }
      });

  }

  constructor(private authService: AuthService,
              private secureService: SecurityService,
              private http: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
  }

}
