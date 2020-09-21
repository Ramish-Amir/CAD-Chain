import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CountdownModule} from 'ngx-countdown';

@Component({
  selector: 'app-buy-id',
  templateUrl: './buy-id.component.html',
  styleUrls: ['./buy-id.component.scss']
})
export class BuyIdComponent implements OnInit {
  exchangeId;
  exchangeData: any = [];
  exchangeStatus = 'sending';
  remainingTime: any = [];

  constructor(private route: ActivatedRoute,
              private http: HttpClient) {
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
          });
      }
    );
  }

}
