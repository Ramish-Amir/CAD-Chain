import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subscription, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

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
  coinList = ['BTC', 'USDT', 'eth', 'BCH', 'XRP', 'EOS', 'LTC', 'HUSD', 'ETC', 'BSV',
    'DASH', 'HPT'];
  coinList2 = [
    {
      image: 'https://simpleswap.io/static/img/currencies/A.svg',
      name: 'Arcblock',
      symbol: 'eth'
    },
    {
      image: 'https://simpleswap.io/static/img/currencies/ada.svg',
      name: 'Cardano',
      symbol: 'ada'
    },
    {
      image: 'https://simpleswap.io/static/img/currencies/xeda.svg',
      name: 'AdEx',
      symbol: 'adx'
    },
    {
      image: 'https://simpleswap.io/static/img/currencies/ae.svg',
      name: 'Aeternity',
      symbol: 'ae'
    },
    {
      image: 'https://simpleswap.io/static/img/currencies/S.svg',
      name: 'SingularityNET',
      symbol: 'agi'
    }];

  convertTo(depositCoin, receiveCoin ) {
    if (this.sendAmount === '0' || this.sendAmount === '' || this.sendAmount === '0.0') {
      console.log('amount is not valid');
      this.getAmount.rate = '';
      return;
    }
    const deposit = depositCoin;
    const receive = 'eth';
    const amount = this.sendAmount;
    return this.http.get('http://127.0.0.1:5000/getRate?deposit=' + deposit + '&receive=' + receive + '&amount=' + amount).subscribe(
      (data) => {
        this.getAmount = data;
        console.log(data);
      });
  }
  getReceiveCoinList(depositCoin) {
    console.log('get receive coin list function works adn value deposit coin is ' + depositCoin);
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



  constructor(private http: HttpClient) {  }

ngOnInit(): void {
    this.http.get('http://127.0.0.1:5000/login').subscribe(
      (data) => {
        this.coinList1 = data;
      }
    );
  }

}
