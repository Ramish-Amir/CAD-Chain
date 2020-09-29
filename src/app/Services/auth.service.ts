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

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }


  constructor(private http: HttpClient) {
  }
}
