import { Component } from '@angular/core';

import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';
import { gsap, TweenMax, TimelineMax, Expo } from 'gsap';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cube';


  //canvas
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  orbitCamera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
  renderer = new THREE.WebGLRenderer({antialias: true});
  
  //object
  geometry = new THREE.BoxGeometry(1, 1, 1);
  material = new THREE.MeshLambertMaterial({color: 0xff5500});
  mesh = new THREE.Mesh(this.geometry, this.material);
  
  //lighting
  light = new THREE.PointLight(0xFFFFFF, 1, 1000);
  light2 = new THREE.PointLight(0xFFFFFF, 1, 1000);
  light3 = new THREE.PointLight(0xFFFFFF, 1, 1000);
  light4 = new THREE.PointLight(0xFFFFFF, 1, 1000);

  //timelines gsap
  tl;
  tl2;

  controls;

  constructor(private commonService: CommonService) {


  //========================================================================//
    //Created and Rendered the canvas ---
  this.renderer.setClearColor("#111111");
  this.renderer.setSize(window.innerWidth, window.innerHeight);

  //camera position on the z-axis -4th wall-
  this.camera.position.z = 5;

  //forelight
  this.light.position.set(0,0,25);
  //sidelight
  this.light2.position.set(50,25,0);
  this.light3.position.set(-25,-50,0);
  //backlight
  this.light4.position.set(0,0,-25);

  this.createMesh();

  document.body.appendChild(this.renderer.domElement);

    window.addEventListener('resize', () =>{
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    });

  this.scene.add(this.mesh);
  this.scene.add(this.light);
  this.scene.add(this.light2);
  this.scene.add(this.light3);
  this.scene.add(this.light4);

  // this.renderer.render(this.scene, this.camera);
    const renderer = this.renderer;
    const scene = this.scene;
    const camera = this.camera;
    const mesh = this.mesh;
    const material = this.material;
    

    const render = function() {
        requestAnimationFrame(render);
        // mesh.rotation.y -= 0.01;
        renderer.render(scene, camera);
    }

  render()
  
    //---//
    //ACTIVATE BY DEFAULT
    this.tl = new TimelineMax().delay(-0.3);
    this.tl.to(mesh.scale, 1, {x: 4, ease: Expo.easeInOut});
    this.tl.to(mesh.scale, 1, {y: 4, ease: Expo.easeInOut}, "=-1");
    this.tl.to(mesh.scale, 1, {z: 4, ease: Expo.easeInOut}, "=-1");
    this.tl.to(mesh.rotation, 5, {y: Math.PI*-1, ease: "none", repeat: -1}); 
//=================================================================================================//


//ACTIVATE WHEN PRESENTATION HAS BEGUN, animation last around 25 seconds
this.commonService.componentMethodCalled$.subscribe(() => {

  this.tl.pause();
  this.tl2 = new TimelineMax().delay(-0.3);

  //slide 1, 6.5 sec
  this.tl2.to(mesh.scale, 1, {x: 2, y: 2, z: 2, ease: Expo.easeInOut});
  this.tl2.to(mesh.position, 1, {x: 0, ease: Expo.easeInOut}, "=-.5");
  this.tl2.to(mesh.rotation, 1, {y: Math.PI*-1, ease: Expo.easeInOut}, "=-1.5"); 

  //slide 2, 9 sec
  this.tl2.to(mesh.position, 1, {x: -4, ease: Expo.easeInOut}, "=+5");
  this.tl2.to(mesh.scale, 1, {x: 1, y: 1, z: 1, ease: Expo.easeInOut},"=-1");
  this.tl2.to(mesh.material.color, 1, {r:.9, g:.9, b:0, ease: Expo.easeInOut});
  this.tl2.to(mesh.material.color, 1, {r:0, g:.9, b:.9, ease: Expo.easeInOut});
  this.tl2.to(mesh.material.color, 1, {r:.9, g:.0, b:.9, ease: Expo.easeInOut});

  //slide 3, 10.2 sec
  this.tl2.to(mesh.position, 1, {x: 3, ease: Expo.easeInOut}, "=+5");
  this.tl2.to(mesh.scale, 1, {x: 3, y: 3, z: 3, ease: Expo.easeInOut},"=-1");
  this.tl2.to(mesh.rotation, 5, {x: Math.PI*.1, y: Math.PI*.1, z: Math.PI*.1, ease: Expo.easeOut},"=-.8");

  //return to center
  this.tl2.to(mesh.position, 1, {x: 0, y:0, z:0, ease: Expo.easeInOut}, "=+5");
  this.tl2.to(mesh.scale, 1, {x: 1, y: 1, z: 1, ease: Expo.easeInOut},"=-1");
  this.tl2.to(mesh.rotation, 5, {x: Math.PI, y: Math.PI, z: Math.PI, ease: Expo.easeOut},"=-1");

  
});

const controls = new OrbitControls(camera, renderer.domElement);
// How far you can orbit vertically, upper and lower limits.
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI;
// How far you can dolly in and out ( PerspectiveCamera only )
controls.minDistance = 0;
controls.maxDistance = Infinity;

  }

  createMesh(){
    this.mesh.position.set(4,0,0);
    this.mesh.rotation.set(0,0,0);
    this.mesh.scale.set(0,0,0);
  }

}
