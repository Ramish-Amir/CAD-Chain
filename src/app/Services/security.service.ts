import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  encryptSecretKey = 'cadchain';

  encryptData(data) {

    try {
      return CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    } catch (e) {
      console.log(e);
    }
  }

  decryptData(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  getDecryptedData() {
    if (!!localStorage.getItem('encryptedData')) {
      return this.decryptData(localStorage.getItem('encryptedData'));
    }
  }

  getToken() {
    if (!!localStorage.getItem('encryptedData')) {
      return (this.decryptData(localStorage.getItem('encryptedData')).access_token);
    } else {
      return null;
    }
  }

  getUsername() {
    if (!!localStorage.getItem('encryptedData')) {
      return (this.decryptData(localStorage.getItem('encryptedData')).username);
    } else {
      return null;
    }
  }

  constructor() { }
}
