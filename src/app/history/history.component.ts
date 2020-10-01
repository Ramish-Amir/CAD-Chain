import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  response: any = [];
  example: any = [];

  displayExchangeInfo(id) {
    console.log(id);
  }

  getUserHistory() {
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
