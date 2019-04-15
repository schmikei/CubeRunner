import { Group } from 'three';
import Box from './models/Box';
import Ring from './models/Ring';
import Plane from './models/Plane';
export default class GameScene extends Group {
    constructor(numBoxes, numRings) {
        super();

        var maxX = 100;
        var maxY = 60;
        var maxZ = 50;

        this.collidableMeshList = [];
        this.floor = new Plane(350, 250);
        this.floor.translateY(-40);
        this.floor.rotateX(Math.PI / 2);
        this.add(this.floor);

        for (let i = 0; i < numBoxes; i++) {
            this.box = new Box(20);
            let translationX = Math.floor(Math.random() * maxX);
            let translationY = Math.floor(Math.random() * maxY);
            let translationZ = Math.floor(Math.random() * maxZ);
            if (i % 2 == 0) {
                this.box.translateX(translationX);
                this.box.translateY(translationY);
                this.box.translateZ(translationZ);
            }
            else {
                this.box.translateX(-(translationX));
                if (translationY > 30) {
                    this.box.translateY(-30);
                }
                else {
                    this.box.translateY(-(translationY));
                }
                this.box.translateZ(-(translationZ));
            }
            this.collidableMeshList.push(this.box);
            this.add(this.box);
        }

        for (let j = 0; j < numRings; j++) {
            this.ring = new Ring(15, 1);
            let ringX = Math.floor(Math.random() * maxX);
            let ringY = Math.floor(Math.random() * maxY);
            let ringZ = Math.floor(Math.random() * maxZ);

            if (j % 2 == 0) {
                this.ring.translateX(ringX);
                this.ring.translateY(ringY);
                this.ring.translateZ(ringZ);
            }
            else {
                this.ring.translateX(-(ringX));
                if (ringY > 20) {
                    this.ring.translateY(-20);
                }
                else {
                    this.ring.translateY(-(ringY));
                }
                this.ring.translateZ(-(ringZ));
            }
            this.add(this.ring);
        }
        return this;
    }
    randomTransforms(intensity) {
        intensity = intensity%100;
        for (let i = 0; i < this.children.length; ++i) {
            let chance = Math.random()*100;
            if (chance < intensity){
                this.children[i].translateX(1);
            }
        }
    }
    updateScene() {
        //we will regenerate the map for the next frame
    }

    addExplosion() {
        particleGeometry = new THREE.Geometry();
        for (var i = 0; i < particleCount; i++) {
            var vertex = new THREE.Vector3();
            particleGeometry.vertices.push(vertex);
        }
        var pMaterial = new THREE.ParticleBasicMaterial({
            color: 0xfffafa,
            size: 0.2
        });
        particles = new THREE.Points(particleGeometry, pMaterial);
        scene.add(particles);
        particles.visible = false;
    }
    getList() {
        return this.collidableMeshList;
    }
} 