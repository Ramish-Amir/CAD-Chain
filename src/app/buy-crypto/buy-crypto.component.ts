import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {interval} from 'rxjs';

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
  recipientAddress;
  addressValidation: any = [];
  messageText = '';
  messageValidation: any = [];
  public exchangeId: any = [];
  fixedRate = false;
  errorCheck: any = [];
  exchangeError;
  isValidPair: any = [];
  disableExchangeButton = false;
  fetchingRate = false;
  fetchingMinMax = false;
  isServerError = false;
  isValidInputAmount = true;
  tokenError: any = [];

  // ----- Method to change the exchange option to Fixed Rate ----- ////

  changeToFixedRate(depositCoin) {
    if (!this.fixedRate) {
      this.fixedRate = true;
      this.http.get('http://127.0.0.1:5000/getcurrencies?fixed=' + this.fixedRate)
        .subscribe(
          data => {
            this.coinList1 = data;
            this.depositCurrency = this.coinList1[0].symbol;
            console.log(this.depositCurrency);
            this.getReceiveCoinList(this.depositCurrency);
          },
          (error) => {
            this.isServerError = true;
          }
        );
    }
  }

  // ----- Method to change the exchange option to Floating Rate ----- ////

  changeToFloatingRate(depositCoin) {
    if (this.fixedRate) {
      this.fixedRate = false;
      this.http.get('http://127.0.0.1:5000/getcurrencies?fixed=' + this.fixedRate)
        .subscribe(
          data => {
            this.coinList1 = data;
            this.depositCurrency = this.coinList1[0].symbol;
            console.log(this.depositCurrency);
            this.getReceiveCoinList(this.depositCurrency);
          },
          (error) => {
            this.isServerError = true;
          }
        );
    }
  }

  //// ----- Method for value conversion whenever a value in entered ----- ////

  convertTo(depositCoin) {
    this.isValidInputAmount = true;
    this.errorCheck = '';
    if (this.sendAmount < this.minMax.min || this.sendAmount === undefined
      || (this.minMax.max !== null && this.sendAmount > this.minMax.max)) {
      console.log('amount is not valid');
      this.getAmount = '';
      return;
    } else if (!(/^\d+\.\d+$|^\d+$|^\.\d+$|^\d+\.$/.test(this.sendAmount))) {
      console.log('The given amount is not a valid number');
      this.isValidInputAmount = false;
      this.getAmount = '';
      return;
    }

    this.fetchingRate = true;
    const getRateUrl = 'http://127.0.0.1:5000/getrate?deposit=' + depositCoin + '&receive='
      + this.receiveCurrency + '&amount=' + this.sendAmount + '&fixed=' + this.fixedRate;
    console.log('GetRateUrl ' + getRateUrl);
    return this.http.get(getRateUrl)
      .subscribe(
        (data) => {
          this.errorCheck = data;
          this.getAmount = data;
          this.fetchingRate = false;
          console.log(this.getAmount);
        },
        (error) => {
          console.log('Check your internet Connection and try again');
          this.isServerError = true;
          return;
        });
  }

  // ----- Method to update the Receiving Currency Pair List (CoinList2) ----- ////

  getReceiveCoinList(depositCoin) {
    const currencyPairUrl = 'http://127.0.0.1:5000/currencypair?symbol=' + depositCoin + '&fixed=' + this.fixedRate;
    console.log(currencyPairUrl);
    this.http.get(currencyPairUrl)
      .subscribe(
        data => {
          this.errorCheck = data;
          if (this.errorCheck.error === 'Empty response') {
            this.minMax = '';
            return;
          }
          const prevCoin = this.receiveCurrency;
          this.coinList2 = data;
          // let isAvailable = false;
          // for (const coin of this.coinList2) {
          //   if (coin.symbol === this.receiveCurrency) {
          //     isAvailable = true;
          //     console.log('Receive currency remains as it is: ' + this.receiveCurrency);
          //     break;
          //   }
          // }
          // console.log('Is available: ' + isAvailable);


          // const index = this.coinList2.findIndex(obj => obj.symbol === this.receiveCurrency);
          // console.log('Index: ' + index);
          // if (index !== -1) {
          //   this.receiveCurrency = this.coinList2[index].symbol;
          // } else {
          //   this.receiveCurrency = this.coinList2[0].symbol;
          //   this.recipientAddress = '';
          //   this.messageText = '';
          // }
          this.receiveCurrency = this.coinList2[0].symbol;
          this.recipientAddress = '';
          this.messageText = '';
          console.log('deposit coin ' + depositCoin);
          console.log('this.receiveCurrency ' + this.receiveCurrency);

          this.validatePair(depositCoin);
        },
        (error) => {
          this.isServerError = true;
        }
      );
  }


  // ----- Method for getting the minimum and maximum values for the currencies ----- ////

  getMinMax(depositCoin) {
    this.minMax = '';
    this.recipientAddress = '';
    console.log(depositCoin);
    console.log(this.receiveCurrency);
    this.fetchingMinMax = true;
    const minMaxUrl = 'http://127.0.0.1:5000/getminmax?deposit=' + depositCoin + '&receive='
      + this.receiveCurrency + '&fixed=' + this.fixedRate;
    console.log(minMaxUrl);
    this.http.get(minMaxUrl)
      .subscribe(
        data => {
          this.errorCheck = data;
          this.minMax = data;
          console.log(data);
          console.log('Min max works fine');
          this.fetchingMinMax = false;
          if (this.errorCheck.error === 'Empty response') {
            this.minMax = '';
            return;
          }
          this.convertTo(depositCoin);
        },
        (error) => {
          this.isServerError = true;
        }
      );
  }

  validatePair(depositCoin) {
    const validatePairUrl = 'http://127.0.0.1:5000/validatepair?depositcurrency=' + depositCoin
      + '&receivecurrency=' + this.receiveCurrency + '&fixed=' + this.fixedRate;
    console.log(validatePairUrl);
    this.http.get(validatePairUrl)
      .subscribe(
        data => {
          this.isValidPair = data;
          console.log(this.isValidPair);
          if (!this.isValidPair) {
            this.errorCheck.error = 'Empty response';
            return;
          } else if (this.isValidPair) {
            this.getMinMax(depositCoin);
          }
        },
        (error) => {
          this.isServerError = true;
        }
      );
  }


  // ----- Recipient's Address Validation Method ----- ////

  validateAddress(address) {
    if (address === '') {
      return;
    }
    console.log('http://127.0.0.1:5000/validateaddress?symbol=' + this.receiveCurrency + '&address=' + address);
    this.http.get('http://127.0.0.1:5000/validateaddress?symbol=' + this.receiveCurrency + '&address=' + address)
      .subscribe(
        data => {
          this.addressValidation = data;
          console.log(data);
        },
        (error) => {
          this.isServerError = true;
        }
      );
  }

  // ----- Message/Memo Validation Method ----- ////

  validateMessage(message) {
    if (message === '') {
      return;
    }
    this.http.get('http://127.0.0.1:5000/validateextra?symbol=' + this.receiveCurrency + '&extra=' + message)
      .subscribe(
        data => {
          this.messageValidation = data;
        },
        (error) => {
          this.isServerError = true;
        }
      );
  }

  // ----- Final Method to post data to the server ----- ////

  postData(depositCoin) {
    this.disableExchangeButton = true;
    const buyData = {
      depositcurrency: depositCoin,
      receivecurrency: this.receiveCurrency,
      address: this.recipientAddress,
      amount: this.sendAmount,
      extraid: this.messageText,
      fixed: this.fixedRate,
    };
    const authToken = localStorage.getItem('access_token');
    console.log(authToken);
    if (authToken === null) {
      console.log('Token not found');
      this.disableExchangeButton = false;
      this.router.navigate(['/login']);
      return;
    }
    const opts = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      })
    };
    console.log(buyData);
    this.http.post('http://127.0.0.1:5000/createexchange', buyData, opts)
      .subscribe(
        (data: any) => {
          this.exchangeId = data;
          this.tokenError = data;
          console.log(data);
          if (this.exchangeId.id === -1) {
            this.exchangeError = 'Something went wrong... Please try again';
            return;
          }
          if (this.tokenError.msg === 'blah blah blah') {
            console.log('Token not found');
            this.router.navigate(['/login']);
            return;
          }
          this.disableExchangeButton = false;
          this.sendAmount = '';
          this.router.navigate(['/exchange', this.exchangeId.id]);

          // --- Adding exchange to user history --- //
          this.addExchange(this.exchangeId.id, opts);

        },
        (error) => {
          if (error.status === 500) {
            this.disableExchangeButton = false;
            this.router.navigate(['/login']);
            console.log(error);
            return;

          }

        });
  }

  addExchange(id, tokenHeader) {
    const userName = localStorage.getItem('username');
    const addExchangePostData = {
      username: userName,
      exchangeid: id
    };
    const addExchangeUrl = 'http://127.0.0.1:5000/addexchange';
    this.http.post(addExchangeUrl, addExchangePostData, tokenHeader)
      .subscribe(
        res => {
          console.log(res);
          console.log('Exchange Data has been addes');
        },
        error => {
          console.log(error);
        }
      );
  }


  constructor(private http: HttpClient, private router: Router) {
    interval(30000).subscribe(x => {
      if (!this.isServerError) {
        this.convertTo(this.depositCurrency);
      }
    });
  }

  ngOnInit(): void {
    this.http.get('http://127.0.0.1:5000/getcurrencies?fixed=false')
      .subscribe(
        (data) => {
          this.coinList1 = data;
          this.depositCurrency = this.coinList1[0].symbol;
          console.log(this.depositCurrency);

          this.http.get('http://127.0.0.1:5000/currencypair?symbol=' + this.depositCurrency + '&fixed=false')
            .subscribe(
              currencyPairData => {
                this.coinList2 = currencyPairData;
                this.receiveCurrency = this.coinList2[0].symbol;
                console.log(this.receiveCurrency);

                this.fetchingMinMax = true;
                this.http.get('http://127.0.0.1:5000/getminmax?deposit=' + this.depositCurrency + '&receive='
                  + this.receiveCurrency + '&fixed=false')
                  .subscribe(
                    minMaxData => {
                      this.minMax = minMaxData;
                      this.fetchingMinMax = false;
                      console.log(minMaxData);
                    },
                    () => {
                      console.log('Error occured in MinMax');
                      this.fetchingMinMax = false;
                    }
                  );
              }
            );
        }
      );

  }

}
