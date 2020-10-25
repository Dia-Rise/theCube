import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AppComponent } from '../app.component';
import { CommonService } from '../common.service';
import * as THREE from 'three';
import { gsap, TweenMax, TimelineMax, Expo } from 'gsap';
// import * as THREE from 'node_modules/three/build/three.module.js'


@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss']
})



export class FrontpageComponent{

  @Output() valueChange = new EventEmitter();

  counter = 0;

  constructor(
    private commonService: CommonService,
    private appPage: AppComponent
  ){}

  // valueChanged(){
  //   console.log(this.appPage.serviceCheck);
  //   this.commonService.checkNum(this.appPage.serviceCheck);
  // }

  valueChanged(){
    this.commonService.callComponentMethod();
  }
}
