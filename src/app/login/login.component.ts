import {Component, OnInit} from '@angular/core';
import {AuthService} from '../Services/auth.service';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  name;
  pass;
  token;

  loginUser() {
    const user = {
      username: 'dummyUsername',
      password: 'dummyPassword'
    };
    console.log(user);
    this.http.post('http://127.0.0.1:5000/login', user).subscribe(
        res => {
          this.token = res;
          console.log(this.token);
          localStorage.setItem('token', this.token.token);
          // console.log(localStorage.getItem('token'));
          // console.log('User has been logged in');
    });

  }

  constructor(private authService: AuthService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
  }

}
