import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {SecurityService} from './security.service';

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
    return !!localStorage.getItem('encryptedData');
  }

  getToken() {
    return localStorage.getItem('encryptedData');
  }


  constructor(private http: HttpClient,
              private secureService: SecurityService) {
  }
}
