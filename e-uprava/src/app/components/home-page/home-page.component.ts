import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    document.body.style.backgroundImage = "url('./../../assets/intro-bg.jpg')";
    document.body.style.padding = '0px';
    document.body.style.overflow = 'hidden';
    document.body.style.width = '100%';

  }

  ngOnDestroy() {
    document.body.style.backgroundImage = 'none';
    document.body.style.paddingTop = '80px';
    document.body.style.overflow = 'auto';
  }

}
