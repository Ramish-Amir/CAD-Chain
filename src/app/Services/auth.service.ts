import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUser(user) {
    this.http.post('http://127.0.0.1:5000/currencypair?symbol', user);
  }

  logoutUser(user) {
  }

  isLoggedIn() {
    return !!localStorage.getItem('access_token');
  }

  getToken() {
    return localStorage.getItem('access_token');
  }


  constructor(private http: HttpClient) {
  }
}
