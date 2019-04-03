import * as THREE from 'three';

export default class StarryBG extends Group{
    constructor(intensity){
        this.stars = []
        for (let i = 0; i < 200; i++) {
            let geometry = new THREE.PlaneGeometry( 0.5, 0.5 );
            let material = new THREE.MeshBasicMaterial( { map: starTexture } );
            let star = new THREE.Mesh( geometry, material );
            star.position.set( getRandom(), getRandom(), getRandom() );
            star.material.side = THREE.DoubleSide;
            this.stars.push( star );
        }

        
    }
    getRandom() {
        var num = Math.floor(Math.random()*10) + 1;
        num *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
        return num;
    }

    animateStars(){
        for (let k = 0; k < this.stars.length; k++) {
            let star = this.stars[k];
            star.rotation.x += 0.01;
            star.rotation.y += 0.01;
        }
    }
}