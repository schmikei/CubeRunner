import * as THREE from 'three';
// const OrbitControls = orbit(THREE);
import TrackballControls from 'three-trackballcontrols';
import GameScene from './GameScene';
// import { PlaneHelper } from 'three';
import Ship from './models/Ship';
import StarryBG from './models/StarryBG';


export default class App {
  constructor() {
    const c = document.getElementById('mycanvas');
    
    var xConstraint = 45;
    var yConstraint = 30;

    var movementSpeed = 2.5;
    //values to be translated in eventlistener
    this.goUp = movementSpeed;
    this.goDown = -(movementSpeed);
    this.goLeft = -(movementSpeed);
    this.goRight = movementSpeed;

    this.gamespeed = 1;

    this.gameOver = false;
    this.isDead = false;

    this.gamelist = [];
    this.renderdistance = 220;

    this.score = 0;
    this.winCondition = 10000;
    this.frameCount = 0;

    // Enable antialias for smoother lines
    this.renderer = new THREE.WebGLRenderer({ canvas: c, antialias: true });
  
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0xf0f0f0);
    var texture = new THREE.TextureLoader().load( "./images/star.jpg" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    this.scene.background = texture;


    //   Use perspective camera:
    //   Field of view: 75 degrees
    //   Screen aspect ration 4:3
    //   Near plane at z=0.5, far plane at z=500
    this.camera = new THREE.PerspectiveCamera(75, 4 / 3, 0.5, this.renderdistance);

    // Place the camera at (0,0,100)
    this.camera.position.z = 100;

    this.tracker = new TrackballControls(this.camera);
    this.tracker.rotateSpeed = 2.0;

    // Allow zoom and pan
    this.tracker.noZoom = false;
    this.tracker.noPan = false;




    // this.scene.add(geometry);

    //adding the lightsource
    const lightOne = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    lightOne.position.set(10, 40, 100);
    lightOne.castShadow = true;
    this.scene.add(lightOne);


    const lightTwo = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    lightTwo.position.set(-10, -40, -100);
    this.scene.add(lightTwo);


    this.offset = 50;

    this.game = new GameScene(0, 0, 0 );
    this.game2 = new GameScene(10, 3, 2);
    this.game2.translateZ(-125);

    // this.game.matrixAutoUpdate = false;
    //pushing the initial gamescene
    // this.gamelist.push(new GameScene(10, 3));
    this.scene.add(this.game);
    this.scene.add(this.game2);

    this.obstacles = [];
    this.obstacles.push(this.game.getList());

    this.bonusRings = [];
    this.bonusRings.push(this.game.getInnerRingList());


    this.scenecounter = 0;

    this.player = new Ship(6, 2, 20);
    this.player.position.z = 50
    this.player.castShadow = true;
    this.scene.add(this.player)

    //adding eventlistener for camera movement
    document.addEventListener('keydown', (e) => {//passing this handler function
      e = e || window.event;


       if (e.keyCode == '38') {
        // up arrow
        // this.camera.translateY(this.goUp);
        if(this.player.position.y < yConstraint){
            this.player.translateY(this.goUp);
        }
      }
      else if (e.keyCode == '40') {// down arrow
        // this.camera.translateY(this.goDown);
        if(this.player.position.y > -yConstraint){
            this.player.translateY(this.goDown);
        }
      }
      else if (e.keyCode == '37') {
        // left arrow
        //  this.camera.translateX(this.goLeft);
        if(this.player.position.x > -xConstraint){
            this.player.translateX(this.goLeft);
        }
      }
      else if (e.keyCode == '39') {
        // right arrow
        //  this.camera.translateX(this.goRight);
            if(this.player.position.x < xConstraint){
                this.player.translateX(this.goRight);
            }
      }
        else if (e.keyCode == '65') {
        // 'A' Key
          this.player.rotateZ((Math.PI / 6));
      }
        else if (e.keyCode == '68') {
        // 'D' Key
          this.player.rotateZ(-(Math.PI / 6));
      }
      else if (e.keyCode == '27') { //press esc to pause
        if (this.isPaused) {
          this.isPaused = false;
          this.goUp = movementSpeed;
          this.goDown = -(movementSpeed);
          this.goLeft = -(movementSpeed);
          this.goRight = (movementSpeed);
          this.gamespeed = .5;
        } else {
          this.goUp = 0;
          this.goDown = 0;
          this.goLeft = 0;
          this.goRight = 0;
          this.isPaused = true;
          this.gamespeed = 0;
        }
      }
    });

    window.addEventListener('resize', () => this.resizeHandler());
    this.resizeHandler();
    requestAnimationFrame(() => this.render());

  }


  render() {
    if (!this.gameOver && !this.isDead) {
      if (this.game.position.z >= 125) {
        //this.sceneZPos = this.game.position.z;
        this.extendframe(this.game.position.z);
      }


      if (this.detectCollision(this.obstacles[0])) {
        this.isDead = true;
        document.getElementById('score').innerHTML = 'Score: ' + this.score + " GAME OVER!!"
      }

      if (this.detectCollision(this.bonusRings[0])) {
        this.score = this.score + 200;
      }

      //this.game.randomTransforms(10);


      this.game.translateZ(this.gamespeed);
      this.game2.translateZ(this.gamespeed);

      // this.camera.lookAt(this.player.position);
      this.renderer.render(this.scene, this.camera);
      this.tracker.update();

      document.getElementById('score').innerHTML = 'Score: ' + this.score;

      // this.controls.update();

      if (this.frameCount % 20 == 0 && !this.isPaused) {
        this.score += 1;
      }

      this.frameCount += 1;
      if (this.score >= this.winCondition){
        this.gameOver = true;
      }
      // setup the render function to "autoloop"
      requestAnimationFrame(() => this.render());
    }else if (this.gameOver){
      document.getElementById('score').innerHTML = 'YOU WIN!! GOOD JOB!! WE ARE PROUD OF YOU';
    }else{
      document.getElementById('score').innerHTML = 'Oh no you died! You obtained a final score of: ' + this.score;
    }
  }



  resizeHandler() {
    const canvas = document.getElementById("mycanvas");
    let w = window.innerWidth - 16;
    let h = 0.75 * w;  /* maintain 4:3 ratio */
    if (canvas.offsetTop + h > window.innerHeight) {
      h = window.innerHeight - canvas.offsetTop - 16;
      w = 4 / 3 * h;
    }
    canvas.width = w;
    canvas.height = h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.tracker.handleResize();
  }

  extendframe() {
    this.scene.remove(this.game);
    this.scene.remove(this.game2);
    this.game = this.game2;
    this.game2 = new GameScene(10, 3, 3);
    this.game2.translateZ(-125);

    this.obstacles.shift(0);
    this.obstacles.push(this.game.getList());

    this.bonusRings.shift(0);
    this.bonusRings.push(this.game.getInnerRingList());
    this.scene.add(this.game);
    this.scene.add(this.game2);

  }

  detectCollision(obstacles) {
    // console.log(obstacles);
    // console.log(this.player.vertices.length);
    for (let i = 0; i < this.player.vertices.length; ++i) {
      var localVertex = this.player.vertices[i].clone();
      var globalVertex = localVertex.applyMatrix4(this.player.matrix);
      var directionVector = globalVertex.sub(this.player.position);

      var raycaster = new THREE.Raycaster(this.player.position, directionVector, 0, 0);
      var collisionResults = raycaster.intersectObjects(obstacles, true);

      if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
        return true;
      }
    }
    // return true;
    return false;
  }



}