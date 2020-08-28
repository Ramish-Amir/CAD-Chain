import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  coinList1 = ['USD', 'CNY', 'HKD', 'VND', 'MYR', 'TWD', 'KRW', 'RUB', 'AUD', 'CAD', 'SGD', 'GBP', 'EUR', 'INR', 'CHF', 'NGN',
          'BRL', 'AED', 'TRY', 'NZD', 'ZAR', 'NOK', 'DKK', 'SEK', 'ALL', 'BGN', 'CZK', 'HRK', 'HUF', 'MDL', 'MKD', 'PLN', 'RON'];

  coinList2 = ['BTC', 'USDT', 'ETH', 'BCH', 'XRP', 'EOS', 'LTC', 'HUSD', 'ETC', 'BSV',
    'DASH', 'HPT'];


  public cryptoAssets = '240';
  public tradingVolume = 23847534383;

  constructor() {
  }

  ngOnInit(): void {
  }

}
