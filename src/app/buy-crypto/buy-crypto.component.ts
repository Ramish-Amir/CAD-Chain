import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subscription, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Component({
  selector: 'app-buy-crypto',
  templateUrl: './buy-crypto.component.html',
  styleUrls: ['./buy-crypto.component.scss']
})
export class BuyCryptoComponent implements OnInit {
  sendAmount;
  getAmount: any = [];
  depositCurrency;
  receiveCurrency;
  coinList1: any = [];
  coinList2: any = [];
  minMax: any = [];
  recipientAddress;
  addressValidation: any = [];

  convertTo(depositCoin, receiveCoin) {
    if (this.sendAmount < this.minMax.min) {
      console.log('amount is not valid');
      this.getAmount.rate = '';
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
        // this.receiveCurrency = this.coinList2[0].symbol;
        console.log(data);
        console.log(this.receiveCurrency);
      }
    );
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
    this.http.get('http://127.0.0.1:5000/getminmax?deposit=' + this.depositCurrency + '&receive=' + this.receiveCurrency).subscribe(
      data => {
        this.minMax = data;
        console.log(data);
      }
    );
  }
  validateAddress(address) {
    this.http.get('http://127.0.0.1:5000/validateaddress?symbol=eth&address=' + address).subscribe(
      data => {
        this.addressValidation = data;
        console.log(data);
      }
    );
  }

  convert() {
    const deposit = this.depositCurrency;
    const receive = 'eth';
    const amount = this.sendAmount;
    return this.http.get('http://127.0.0.1:5000/getRate?deposit=' + deposit + '&receive=' + receive + '&amount=' + amount).subscribe(
      (data) => {
        this.getAmount = data;
        console.log(data);
      });
  }

  // postData() {
  //   this.http.post(this.postUrl, this.postedData).subscribe(
  //     (data: any) => {
  //       this.receivedResponse = JSON.stringify(data);
  //   });
  // }


  constructor(private http: HttpClient) {
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
    this.http.get('http://127.0.0.1:5000/getminmax?deposit=' + this.depositCurrency + '&receive=' + this.receiveCurrency).subscribe(
      data => {
        this.minMax = data;
        console.log(data);
      }
    );
  }

}
