import {Component, OnInit} from '@angular/core';
import {AuthService} from '../Services/auth.service';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

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
      username: this.name,
      password: this.pass
    };
    console.log(user);
    this.http.post('http://127.0.0.1:5000/login', user).subscribe(
        res => {
          this.token = res;
          console.log(this.token);
          localStorage.setItem('access_token', this.token.access_token);
          console.log(localStorage.getItem('access_token'));
          console.log('User has been logged in');
          this.router.navigate(['/home']);
    });

  }

  constructor(private authService: AuthService,
              private http: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
  }

}
