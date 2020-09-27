import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
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

  constructor(private route: ActivatedRoute,
              private http: HttpClient) {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window: resize', ['$event'])
  onResize(event) {
    this.screenWidth = innerWidth;
  }


  ngOnInit(): void {
    const exId = this.route.snapshot.paramMap.get('id');
    this.exchangeId = exId;
    this.http.get('http://127.0.0.1:5000/getexchange?id=' + exId).subscribe(
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
      }
    );
  }

}
