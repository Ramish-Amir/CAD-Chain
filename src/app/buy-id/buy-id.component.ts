import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-buy-id',
  templateUrl: './buy-id.component.html',
  styleUrls: ['./buy-id.component.scss']
})
export class BuyIdComponent implements OnInit {
  exchangeId;
  exchangeData: any = [];
  exchangeStatus = 'sending';

  constructor(private route: ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit(): void {
    const exId =  this.route.snapshot.paramMap.get('id');
    this.exchangeId = exId;
    this.http.get('http://127.0.0.1:5000/getexchange?id=' + exId).subscribe(
      data => {
        this.exchangeData = data;
        console.log(data);
      }
    );
  }

}
