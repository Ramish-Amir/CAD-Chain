import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  public exchangeData: any = [];
  constructor() { }
  setExchangeData(sendAmount, receiveAmount, sendCurrency, receiveCurrency) {
    this.exchangeData.sendAmount = sendAmount;
    this.exchangeData.receiveAmount = receiveAmount;
    this.exchangeData.sendCurrency  = sendCurrency;
    this.exchangeData.receiveCurrency = receiveCurrency;
  }
}
