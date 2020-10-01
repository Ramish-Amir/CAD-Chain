import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../Services/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  public selectedLanguage = 'English';
  public isLoggedIn;

  changeLanguage(newLanguage) {
    this.selectedLanguage = newLanguage;
  }

  logout() {
    const authToken = localStorage.getItem('access_token');
    const data = {};
    const opts = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${authToken}`
      })
    };
    this.http.post('http://127.0.0.1:5000/logout/access', data, opts)
      .subscribe((res) => {
      console.log(res);
      localStorage.removeItem('access_token');
      localStorage.removeItem('username');
      console.log(localStorage.getItem('access_token'));
      this.isLoggedIn = false;
    });
  }

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event.constructor.name === 'NavigationEnd') {
        this.isLoggedIn = this.authService.isLoggedIn();
      }
    });
    console.log(this.isLoggedIn);
  }

}
