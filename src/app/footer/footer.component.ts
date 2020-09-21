import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  exchangeID;

  trackSwap() {
    if (this.exchangeID) {
      const id = this.exchangeID;
      console.log(id);
      this.router.navigate(['/buy', this.exchangeID]);
      this.exchangeID = '';
    }
  }

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

}
