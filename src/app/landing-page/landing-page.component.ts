import {Component, OnInit} from '@angular/core';
import {isNull} from 'util';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  // encapsulation: ViewEncapsulation.None
})

export class LandingPageComponent implements OnInit {
  public cryptoAssets = '240';
  public tradingVolume = 23847534383;
  public getAmount; sendAmount;
  public xButton = document.getElementById('exchangeButton');

  coinList1 = ['USD', 'CNY', 'HKD', 'VND', 'MYR', 'TWD', 'KRW', 'RUB', 'AUD', 'CAD', 'SGD', 'GBP', 'EUR', 'INR', 'CHF', 'NGN',
          'BRL', 'AED', 'TRY', 'NZD', 'ZAR', 'NOK', 'DKK', 'SEK', 'ALL', 'BGN', 'CZK', 'HRK', 'HUF', 'MDL', 'MKD', 'PLN', 'RON'];

  coinList2 = ['BTC', 'USDT', 'ETH', 'BCH', 'XRP', 'EOS', 'LTC', 'HUSD', 'ETC', 'BSV',
    'DASH', 'HPT'];

  // isNumberKey(value) {
  //   this.getAmount.innerText = value;
  // }

  convertTo(val) {
    const amount = val * 2;
    if (isNaN(amount)) {
      this.getAmount = 'Invalid Amount';
      return;
    }
    if (amount === 0) {
      this.getAmount = '';
      return;
    }
    this.getAmount = amount;
    return;
  }
  convertFrom(val) {
    const amount = val / 2;
    if (isNaN(amount)) {
        this.sendAmount = 'Invalid Amount';
        return;
    }
    if (amount === 0) {
      this.sendAmount = '';
      return;
    }
    this.sendAmount = amount;
    return;
  }


  constructor() {
  }

  ngOnInit(): void {
  }

}
