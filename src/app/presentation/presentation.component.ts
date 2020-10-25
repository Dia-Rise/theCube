import { Component, AfterViewInit, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';
import { CommonService } from '../common.service';
import { gsap, TweenMax, TimelineMax, Expo } from 'gsap';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements  AfterViewInit {

  @ViewChild('slideOne', { static: false }) slideOne: ElementRef;
  @ViewChild('slideTwo', { static: false }) slideTwo: ElementRef;
  @ViewChild('slideThree', { static: false }) slideThree: ElementRef;
  @ViewChild('main', { static: false }) main: ElementRef;
  tl;
  tl2;
  tl3;
  tl4;

  constructor(
    private commonService: CommonService,
    private appPage: AppComponent
    ) { 
      this.commonService.callComponentMethod();

    }

  ngAfterViewInit(): void {

    const slide1 = this.slideOne.nativeElement;
    const slide2 = this.slideTwo.nativeElement;
    const slide3 = this.slideThree.nativeElement;
    const main = this.main.nativeElement;
      //begin presentation animation

      // slide 1, 6.5 sec
      this.tl = new TimelineMax().delay(0.2);
      this.tl.to(slide1, 1, {opacity: 1, ease: Expo.easeInOut});
      this.tl.to(slide1, 1, {left: '10%', ease: Expo.easeInOut}, "=-1");
      this.tl.to(slide1, 1, {left: '0%', ease: Expo.easeInOut}, "=4.7");
      this.tl.to(slide1, 1, {opacity: 0, ease: Expo.easeInOut}, "=-1.2");

      // slide 2, 9 sec
      this.tl2 = new TimelineMax().delay(6.7);
      this.tl2.to(slide2, 1, {opacity: 1, ease: Expo.easeInOut});
      this.tl2.to(slide2, 1, {left: '50%', ease: Expo.easeInOut}, "=-1");
      this.tl2.to(slide2, 1, {left: '100%', ease: Expo.easeInOut}, "=7.5");
      this.tl2.to(slide2, 1, {opacity: 0, ease: Expo.easeInOut}, "=-1.2");

      // slide 3, 10.2 sec

      this.tl3 = new TimelineMax().delay(15.2);
      this.tl3.to(slide3, 1, {opacity: 1, ease: Expo.easeInOut});
      this.tl3.to(slide3, 1, {left: '10%', ease: Expo.easeInOut}, "=-1");
      this.tl3.to(slide3, 1, {left: '0%', ease: Expo.easeInOut}, "=10.5");
      this.tl3.to(slide3, 1, {opacity: 0, ease: Expo.easeInOut}, "=-1.2");
      this.tl3.to(main, 1, {display: "none", ease: Expo.easeInOut});
  }


}
