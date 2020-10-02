import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  response: any = [];
  exchangeDetails: any = [];
  fetchingData = true;


  getUserHistory() {
    this.fetchingData = true;
    const authToken = localStorage.getItem('access_token');
    const getUserExchangeUrl = 'http://127.0.0.1:5000/getuserexchange';
    const getUserExchangePostData = {
      username: (localStorage.getItem('username'))
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

          for (let i = 1; i <= this.response.exchanges.length ; i++) {
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
          if (index === this.response.exchanges.length - 1) {
            this.fetchingData = false;
          }
        },
        error => {
          console.log(error);
        }
      );
  }


  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getUserHistory();
  }
}
