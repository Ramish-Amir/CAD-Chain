import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {log} from 'util';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  exchangeID;
  isValidId: any = [];
  validatingID = false;

  trackSwap() {
    if (this.exchangeID) {
      console.log(this.exchangeID);
      const postId = {
        id: this.exchangeID
      };
      this.validatingID = true;
      this.http.post('http://127.0.0.1:5000/validateid', postId)
        .subscribe(
          data => {
            console.log(data);
            this.isValidId = data;
            this.validatingID = false;
            if (this.isValidId.valid) {
              this.router.navigate(['/buy', this.exchangeID]);
              this.exchangeID = '';
            }
          },
          () => {
          }
        );
    }
  }

  constructor(private router: Router,
              private http: HttpClient) {
  }

  ngOnInit(): void {
  }

}
