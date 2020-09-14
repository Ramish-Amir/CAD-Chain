import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';


import {Observable, of, Subscription, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Route, Router} from '@angular/router';
import {ExchangeService} from '../Services/exchange.service';

@Component({
  selector: 'app-buy-crypto',
  templateUrl: './buy-crypto.component.html',
  styleUrls: ['./buy-crypto.component.scss']
})


export class BuyCryptoComponent implements OnInit {
  sendAmount;
  getAmount: any = [];
  depositCurrency: any = [];
  receiveCurrency: any = [];
  coinList1: any = [];
  coinList2: any = [];
  minMax: any = [];
  recipientAddress;
  addressValidation: any = [];
  messageText = '';
  messageValidation: any = [];
  public exchangeId: any = [];

  convertTo(depositCoin, receiveCoin) {
    if (this.sendAmount < this.minMax.min) {
      console.log('amount is not valid');
      this.getAmount = '';
      return;
    }
    const deposit = depositCoin;
    const receive = receiveCoin;
    const amount = this.sendAmount;
    console.log(receiveCoin);
    return this.http.get('http://127.0.0.1:5000/getrate?deposit=' + deposit + '&receive=' + receive + '&amount=' + amount).subscribe(
      (data) => {
        this.getAmount = data;
        console.log(data);
      });
  }

  getReceiveCoinList(depositCoin) {
    this.http.get('http://127.0.0.1:5000/currencypair?symbol=' + depositCoin).subscribe(
      (data) => {
        this.coinList2 = data;
        console.log(this.receiveCurrency);
      }
    );
    this.sendAmount = '';
    this.getAmount = '';
    this.recipientAddress = '';
    this.messageText = '';
    this.http.get('http://127.0.0.1:5000/getminmax?deposit=' + depositCoin + '&receive=' + this.coinList2[0].symbol).subscribe(
      (data) => {
        this.minMax = data;
        console.log(data);
      }
    );
  }
  getMinMax(depositCoin, receiveCoin) {
    console.log(depositCoin);
    console.log(receiveCoin);
    console.log(this.receiveCurrency);
    const minMaxUrl = 'http://127.0.0.1:5000/getminmax?deposit=' + depositCoin + '&receive=' + receiveCoin;
    console.log(minMaxUrl);
    this.http.get('http://127.0.0.1:5000/getminmax?deposit=' + depositCoin + '&receive=' + receiveCoin).subscribe(
      data => {
        this.minMax = data;
        console.log(data);
      }
    );
    this.sendAmount = '';
    this.getAmount = '';
    this.recipientAddress = '';
    this.messageText = '';
  }

  validateAddress(receiveCoin, address) {
    if (address === '') {
      return;
    }
    console.log('http://127.0.0.1:5000/validateaddress?symbol=' + receiveCoin + '&address=' + address);
    this.http.get('http://127.0.0.1:5000/validateaddress?symbol=' + receiveCoin + '&address=' + address).subscribe(
      data => {
        this.addressValidation = data;
        console.log(data);
      }
    );
  }
  validateMessage(receiveCoin, message) {
    if (message === '') {
      return;
    }
    this.http.get('http://127.0.0.1:5000/validateextra?symbol=' + receiveCoin + '&extra=' + message).subscribe(
      data => {
        this.messageValidation = data;
      }
    );
  }

  // convert() {
  //   const deposit = this.depositCurrency;
  //   const receive = 'eth';
  //   const amount = this.sendAmount;
  //   return this.http.get('http://127.0.0.1:5000/getRate?deposit=' + deposit + '&receive=' + receive + '&amount=' + amount).subscribe(
  //     (data) => {
  //       this.getAmount = data;
  //       console.log(data);
  //     });
  // }

  postData(depositCoin, receiveCoin) {
    const postData = {
      depositcurrency: depositCoin,
      receivecurrency: receiveCoin,
      address: this.recipientAddress,
      amount: this.sendAmount,
      extraid: this.messageText
    };
    const opts = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    console.log(postData);
    this.http.post('http://127.0.0.1:5000/createexchange', postData, opts).toPromise().then(
      (data: any) => {
        this.exchangeId = data;
        this.router.navigate(['/buy', this.exchangeId.id]);
      });
  }


  constructor(private http: HttpClient,
              private router: Router,
              private exchangeService: ExchangeService) {
  }

  ngOnInit(): void {
    this.http.get('http://127.0.0.1:5000/login').subscribe(
      (data) => {
        this.coinList1 = data;
        this.depositCurrency = this.coinList1[0].symbol;
        console.log(this.depositCurrency);
      }
    );
    this.http.get('http://127.0.0.1:5000/currencypair?symbol=abt').subscribe(
      data => {
        this.coinList2 = data;
        this.receiveCurrency = this.coinList2[0].symbol;
        console.log(this.receiveCurrency);
      }
    );
    this.http.get('http://127.0.0.1:5000/getminmax?deposit=abt&receive=ada').subscribe(
      data => {
        this.minMax = data;
        console.log(data);
      }
    );
  }

}
