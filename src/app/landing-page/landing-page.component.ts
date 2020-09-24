import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})

export class LandingPageComponent implements OnInit {
  public cryptoAssets = '240';
  public tradingVolume = 23847534383;
  public getAmount;
  sendAmount;

  widgetCoinId = ['binancecoin', 'bitcoin', 'ethereum', 'litecoin', 'ripple', 'link', 'tether', 'bitcoin-cash', 'eos'];

  coinList1 = ['USD', 'CNY', 'HKD', 'VND', 'MYR', 'TWD', 'KRW', 'RUB', 'AUD', 'CAD', 'SGD', 'GBP', 'EUR', 'INR', 'CHF', 'NGN',
    'BRL', 'AED', 'TRY', 'NZD', 'ZAR', 'NOK', 'DKK', 'SEK', 'ALL', 'BGN', 'CZK', 'HRK', 'HUF', 'MDL', 'MKD', 'PLN', 'RON'];

  coinList2 = ['BTC', 'USDT', 'ETH', 'BCH', 'XRP', 'EOS', 'LTC', 'HUSD', 'ETC', 'BSV',
    'DASH', 'HPT'];
  elements: any = [
    {rank: 1, name: 'Bitcoin', price: '$ 11,920.00', change: '+2.71%', market: 'None'},
    {rank: 2, name: 'Bitcoin', price: '$ 11,920.00', change: '+2.71%', market: 'None'},
    {rank: 3, name: 'Bitcoin', price: '$ 11,920.00', change: '+2.71%', market: 'None'},
    {rank: 4, name: 'Bitcoin', price: '$ 11,920.00', change: '+2.71%', market: 'None'},
    {rank: 5, name: 'Bitcoin', price: '$ 11,920.00', change: '+2.71%', market: 'None'},
  ];

  headElements = ['Rank', 'Name', 'Price', '24 hrs change', 'Market'];

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
