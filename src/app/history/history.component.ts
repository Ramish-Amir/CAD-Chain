import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SecurityService} from '../Services/security.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  response: any = [];
  exchangeDetails: any = [];
  noExchangeData = false;
  fetchingData = true;


  getUserHistory() {
    this.fetchingData = true;
    const authToken = this.secureService.getToken();
    const getUserExchangeUrl = 'http://127.0.0.1:5000/getuserexchange';
    const getUserExchangePostData = {
      username: this.secureService.getUsername()
    };
    const opts = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      })
    };

    this.http.post(getUserExchangeUrl, getUserExchangePostData, opts)
      .subscribe(
        res => {
          this.response = res;
          console.log(this.response);

          if (!this.response.exchanges.length) {
            this.noExchangeData = true;
            console.log('Array: ' + this.response.exchanges);
            this.fetchingData = false;
            return;
          }

          for (let i = 1; i <= this.response.exchanges.length; i++) {
            this.getExchangeData(this.response.exchanges[i - 1], i - 1, opts);
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  getExchangeData(id, index, header) {
    const getExchangeDataUrl = 'http://127.0.0.1:5000/getexchange?id=' + id;
    this.http.get(getExchangeDataUrl, header)
      .subscribe(
        data => {
          // console.log(data);
          this.exchangeDetails[index] = data;
          console.log(this.exchangeDetails[index]);
          // this.fetchingData = false;
          if (index === this.response.exchanges.length - 1) {
            setTimeout(() => {
              this.fetchingData = false;
            }, 1000);
            // this.fetchingData = false;
          }
        },
        error => {
          this.noExchangeData = true;
          this.fetchingData = false;
          console.log(error);
          return;
        }
      );
  }


  constructor(private http: HttpClient, private secureService: SecurityService) {
  }

  ngOnInit(): void {
    this.getUserHistory();
  }
}
