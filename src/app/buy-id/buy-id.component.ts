import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CountdownModule} from 'ngx-countdown';

@Component({
  selector: 'app-buy-id',
  templateUrl: './buy-id.component.html',
  styleUrls: ['./buy-id.component.scss']
})
export class BuyIdComponent implements OnInit {
  screenWidth;
  exchangeId;
  exchangeData: any = [];
  remainingTime: any = [];
  errorCheck: any = [];
  fetchingData = true;
  tokenError: any = [];

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private router: Router) {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window: resize', ['$event'])
  onResize(event) {
    this.screenWidth = innerWidth;
  }


  ngOnInit(): void {
    const authToken = localStorage.getItem('access_token');
    // if (authToken === null) {
    //   authToken = 'slkdjsldkfj';
    // }
    const exId = this.route.snapshot.paramMap.get('id');
    this.exchangeId = exId;
    console.log(authToken);
    const opts = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`
      })
    };
    this.http.get('http://127.0.0.1:5000/getexchange?id=' + exId, opts).subscribe(
      data => {
        this.exchangeData = data;
        console.log(data);

        const timestampData = {
          time: this.exchangeData.timestamp
        };
        console.log(this.exchangeData.timestamp);
        this.http.post('http://127.0.0.1:5000/gettime', timestampData)
          .subscribe(timeData => {
            console.log(timeData);
            this.remainingTime = timeData;
            console.log(this.remainingTime);
            this.fetchingData = false;
          });
      },
      error => {
        if (error.status === 500) {
          this.fetchingData = false;
          this.router.navigate(['/login']);
          return;
        }
      }
    );
  }

}
