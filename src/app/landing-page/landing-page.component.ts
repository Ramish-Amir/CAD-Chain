import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  countries = ['Pakistan', 'Canada', 'Turkey', 'America'];

  public cryptoAssets = '240';
  public tradingVolume = 23847534383;
  constructor() { }

  ngOnInit(): void {
  }

}
