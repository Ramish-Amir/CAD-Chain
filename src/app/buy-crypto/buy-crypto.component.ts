import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

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
  minMax: any = ['none'];
  recipientAddress = '';
  addressValidation: any = [];
  messageText = '';
  messageValidation: any = [];
  public exchangeId: any = [];
  fixedRate = false;
  errorCheck: any = [];
  exchangeError;

  // ----- Method to change the exchange option to Fixed Rate ----- ////

  changeToFixedRate(depositCoin, receiveCoin) {
    this.fixedRate = true;
    const tUrl = 'http://127.0.0.1:5000/currencypair?symbol=' + depositCoin + '&fixed=' + this.fixedRate;
    console.log(tUrl);
    this.http.get('http://127.0.0.1:5000/currencypair?symbol=' + depositCoin + '&fixed=' + this.fixedRate)
      .subscribe(
        (data) => {
          this.errorCheck = data;
          if (this.errorCheck.error === 'Empty Response') {
            return;
          }
          this.coinList2 = data;
          // console.log(this.receiveCurrency);

          // ----- Calling minMax function if currency Pair is available ----- //

          this.getMinMax(depositCoin, receiveCoin);
        }
      );
  }

  // ----- Method to change the exchange option to Floating Rate ----- ////

  changeToFloatingRate(depositCoin, receiveCoin) {
    this.fixedRate = false;
    const tUrl = 'http://127.0.0.1:5000/currencypair?symbol=' + depositCoin + '&fixed=' + this.fixedRate;
    console.log(tUrl);
    this.http.get('http://127.0.0.1:5000/currencypair?symbol=' + depositCoin + '&fixed=' + this.fixedRate)
      .subscribe(
        (data) => {
          this.errorCheck = data;
          if (this.errorCheck.error === 'Empty Response') {
            return;
          }
          this.coinList2 = data;
          // console.log(this.receiveCurrency);

          // ----- Calling minMax function if currency Pair is available ----- //

          this.getMinMax(depositCoin, receiveCoin);
        }
      );
  }

  // ----- Method for value conversion whenever a value in entered ----- ////

  convertTo(depositCoin, receiveCoin) {
    if (this.sendAmount < this.minMax.min) {
      console.log('amount is not valid');
      this.getAmount = '';
      return;
    }
    console.log(receiveCoin);
    return this.http.get('http://127.0.0.1:5000/getrate?deposit=' + depositCoin + '&receive='
      + receiveCoin + '&amount=' + this.sendAmount + '&fixed=' + this.fixedRate)
      .subscribe(
        (data) => {
          this.getAmount = data;
          console.log(this.getAmount);
        });
  }

  // ----- Method to update the Receiving Currency List (CoinList2) ----- ////

  getReceiveCoinList(depositCoin, receiveCoin) {
    const rUrl = 'http://127.0.0.1:5000/currencypair?symbol=' + depositCoin + '&fixed=' + this.fixedRate;
    console.log(rUrl);
    this.http.get('http://127.0.0.1:5000/currencypair?symbol=' + depositCoin + '&fixed=' + this.fixedRate)
      .subscribe(
        data => {
          this.coinList2 = data;
          // console.log(data);
          console.log(this.receiveCurrency);
          console.log(this.depositCurrency);
        }
      );
    this.sendAmount = '';
    this.getAmount = '';
    this.recipientAddress = '';
    this.messageText = '';
    const mmUrl = 'http://127.0.0.1:5000/getminmax?deposit=' + depositCoin + '&receive='
      + this.coinList2[0].symbol + '&fixed=' + this.fixedRate;
    console.log(mmUrl);
    this.http.get('http://127.0.0.1:5000/getminmax?deposit=' + depositCoin + '&receive='
      + receiveCoin + '&fixed=' + this.fixedRate)
      .subscribe(
        (data) => {
          this.errorCheck = data;
          console.log(this.errorCheck.error);
          this.minMax = data;
          console.log(data);
        }
      );
  }


  // ----- Method for getting the minimum and maximum values for the currencies ----- ////

  getMinMax(depositCoin, receiveCoin) {
    console.log(depositCoin);
    console.log(receiveCoin);
    console.log(this.receiveCurrency);
    const minMaxUrl = 'http://127.0.0.1:5000/getminmax?deposit=' + depositCoin + '&receive=' + receiveCoin + '&fixed=' + this.fixedRate;
    console.log(minMaxUrl);
    this.http.get('http://127.0.0.1:5000/getminmax?deposit=' + depositCoin + '&receive=' + receiveCoin + '&fixed=' + this.fixedRate)
      .subscribe(
        data => {
          this.errorCheck = data;
          this.minMax = data;
          console.log(data);
          console.log('Min max works fine');
          this.sendAmount = '';
          this.getAmount = '';
          this.recipientAddress = '';
          this.messageText = '';
          if (this.errorCheck.error === 'Empty response') {
            return;
          }
        }
      );
  }


  // ----- Recipient's Address Validation Method ----- ////

  validateAddress(receiveCoin, address) {
    if (address === '') {
      return;
    }
    console.log('http://127.0.0.1:5000/validateaddress?symbol=' + receiveCoin + '&address=' + address);
    this.http.get('http://127.0.0.1:5000/validateaddress?symbol=' + receiveCoin + '&address=' + address)
      .subscribe(
        data => {
          this.addressValidation = data;
          console.log(data);
        }
      );
  }

  // ----- Message/Memo Validation Method ----- ////

  validateMessage(receiveCoin, message) {
    if (message === '') {
      return;
    }
    this.http.get('http://127.0.0.1:5000/validateextra?symbol=' + receiveCoin + '&extra=' + message)
      .subscribe(
        data => {
          this.messageValidation = data;
        }
      );
  }

  // ----- Final Method to post data to the server ----- ////

  postData(depositCoin, receiveCoin) {
    const buyData = {
      depositcurrency: depositCoin,
      receivecurrency: receiveCoin,
      address: this.recipientAddress,
      amount: this.sendAmount,
      extraid: this.messageText
    };
    const opts = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log(buyData);
    this.http.post('http://127.0.0.1:5000/createexchange', buyData, opts)
      .subscribe(
        (data: any) => {
          this.exchangeId = data;
          if (this.exchangeId.id === -1) {
            this.exchangeError = 'Something went wrong... Please refresh the page';
            return;
          }
          this.router.navigate(['/buy', this.exchangeId.id]);
        });
  }


  constructor(private http: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.recipientAddress);
    this.http.get('http://127.0.0.1:5000/login')
      .subscribe(
        (data) => {
          this.coinList1 = data;
          this.depositCurrency = this.coinList1[0].symbol;
          console.log(this.depositCurrency);
        }
      );
    this.http.get('http://127.0.0.1:5000/currencypair?symbol=abt&fixed=false')
      .subscribe(
        data => {
          this.coinList2 = data;
          this.receiveCurrency = this.coinList2[0].symbol;
          console.log(this.receiveCurrency);
        }
      );
    this.http.get('http://127.0.0.1:5000/getminmax?deposit=abt&receive=ada&fixed=false')
      .subscribe(
        data => {
          this.minMax = data;
          console.log(JSON.stringify(data));
          console.log(data);
        }
      );

  }

}
