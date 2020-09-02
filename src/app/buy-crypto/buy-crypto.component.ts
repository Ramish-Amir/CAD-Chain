import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buy-crypto',
  templateUrl: './buy-crypto.component.html',
  styleUrls: ['./buy-crypto.component.scss']
})
export class BuyCryptoComponent implements OnInit {
  public getAmount; sendAmount;

  coinList1 = ['USD', 'CNY', 'HKD', 'VND', 'MYR', 'TWD', 'KRW', 'RUB', 'AUD', 'CAD', 'SGD', 'GBP', 'EUR', 'INR', 'CHF', 'NGN',
    'BRL', 'AED', 'TRY', 'NZD', 'ZAR', 'NOK', 'DKK', 'SEK', 'ALL', 'BGN', 'CZK', 'HRK', 'HUF', 'MDL', 'MKD', 'PLN', 'RON'];

  coinList2 = ['BTC', 'USDT', 'ETH', 'BCH', 'XRP', 'EOS', 'LTC', 'HUSD', 'ETC', 'BSV',
    'DASH', 'HPT'];
  sortedItems = ['Link 1', 'Link 2', 'Link 3', 'Link 4'];
  searchValue = '';

  filterItems() {
    return this.sortedItems.filter(el => el.indexOf(this.searchValue) !== -1);
  }
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



  constructor() { }

ngOnInit(): void {
  }

}
