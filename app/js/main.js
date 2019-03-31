import * as THREE from 'three';
// const OrbitControls = orbit(THREE);
import TrackballControls from 'three-trackballcontrols';
import GameScene from './GameScene';
import { PlaneHelper } from 'three';
import Ship from './models/Ship';


export default class App {
  constructor() {
    const c = document.getElementById('mycanvas');


    //values to b e translated in eventlistener
    this.goUp = 3;
    this.goDown = -3;
    this.goLeft = -3;
    this.goRight = 3;

    this.gamespeed = -.5;
    this.renderdistance = 300;


    // Enable antialias for smoother lines
    this.renderer = new THREE.WebGLRenderer({canvas: c, antialias: true});
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xfffff0);

    //   Use perspective camera:
    //   Field of view: 75 degrees
    //   Screen aspect ration 4:3
    //   Near plane at z=0.5, far plane at z=500
    this.camera = new THREE.PerspectiveCamera(75, 4/3, 0.5, this.renderdistance);
   

    // this.controls = new OrbitControls(this.camera);
    // this.controls.update();

    // Place the camera at (0,0,100)
    this.camera.position.z = 100;

    this.tracker = new TrackballControls(this.camera);
    this.tracker.rotateSpeed = 2.0;
    // Allow zoom and pan
    this.tracker.noZoom = false;
    this.tracker.noPan = false;

    

    // Dodecahedron radius = 30
    const dodecgeom = new THREE.DodecahedronGeometry(30);
    const dodecmatr = new THREE.MeshPhongMaterial({color: 0x14ae6e});
    const dodecmesh = new THREE.Mesh(dodecgeom, dodecmatr);
    // this.scene.add(dodecmesh);


    //adding the lightsource
    const lightOne = new THREE.DirectionalLight (0xFFFFFF, 1.0);
    lightOne.position.set (10, 40, 100);
    this.scene.add (lightOne); 


    const lightTwo = new THREE.DirectionalLight (0xFFFFFF, 1.0);
    lightTwo.position.set (-10, -40, -100);
    this.scene.add (lightTwo); 


    this.game = new GameScene(10, 3);
    this.game.matrixAutoUpdate = false;
    this.scene.add (this.game); 

    this.player = new Ship(15);
    this.player.position.z = 50
    this.scene.add(this.player)

    //adding eventlistener for camera movement
    document.addEventListener('keydown', (e) =>{//passing this handler function
      e = e || window.event;
  
      if (e.keyCode == '38') {
          // up arrow
          // this.camera.translateY(this.goUp);
          this.player.translateY(this.goUp);
      }
      else if (e.keyCode == '40') {// down arrow
          // this.camera.translateY(this.goDown);
          this.player.translateY(this.goDown);
      }
      else if (e.keyCode == '37') {
         // left arrow
        //  this.camera.translateX(this.goLeft);
         this.player.translateX(this.goLeft);
      }
      else if (e.keyCode == '39') {
         // right arrow
        //  this.camera.translateX(this.goRight);
         this.player.translateX(this.goRight);
      }
      else if (e.keyCode == '27'){ //press esc to pause
        if (this.isPaused){
          this.isPaused = false;
          this.goUp = 3;
          this.goDown = -3;
          this.goLeft = -3;
          this.goRight = 3;
          this.gamespeed = -.1;
        }else{
          this.goUp = 0;
          this.goDown = 0;
          this.goLeft = 0;
          this.goRight = 0;
          this.isPaused = true;
          this.gamespeed = '0';
        }
      }
    });


    window.addEventListener('resize', () => this.resizeHandler());
    this.resizeHandler();
    requestAnimationFrame(() => this.render());
    
  }



  render() {
    console.log(this.camera.position);
    if (this.camera.position.z < 0){
      this.scene.remove(this.game);
      //regenerate game board
      this.game = new GameScene(10, 3);
      this.game.matrixAutoUpdate = false;
      this.scene.add (this.game); 

      this.player.position.z = 100;
      this.camera.position.z = 150
    }

    this.camera.translateZ(this.gamespeed);
    this.player.translateZ(this.gamespeed);


    this.renderer.render(this.scene, this.camera);
    this.tracker.update();



    // this.controls.update();
    // setup the render function to "autoloop"
    requestAnimationFrame(() => this.render());
  }

  move(direction){
    if (direction == 'up'){
      console.log("HI");
    }
  }

  resizeHandler() {
    const canvas = document.getElementById("mycanvas");
    let w = window.innerWidth - 16;
    let h = 0.75 * w;  /* maintain 4:3 ratio */
    if (canvas.offsetTop + h > window.innerHeight) {
      h = window.innerHeight - canvas.offsetTop - 16;
      w = 4/3 * h;
    }
    canvas.width = w;
    canvas.height = h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.tracker.handleResize();
  }

}