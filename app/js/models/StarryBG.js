import * as THREE from 'three';
import { BoxGeometry, MeshBasicMaterial, Mesh, Group} from 'three';


export default class StarryBG extends Group{
    constructor(){
        super();
        var texture = new THREE.TextureLoader().load( "./app/js/models/star.jpg" );
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        var backgroundMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2, 0),
            new THREE.MeshBasicMaterial({
                map: texture
            }));
        // backgroundMesh.material.depthTest = false;
        backgroundMesh.material.depthWrite = false;

        this.backgroundScene = new THREE.Scene();
        this.backgroundCamera = new THREE.Camera();
        this.backgroundScene.add(this.backgroundCamera );
        this.backgroundScene.add(backgroundMesh);

        // var starsMaterial = new THREE.PointsMaterial( { color: 0x888888 } );
        // var starsGeometry = new THREE.Geometry();

        // for ( var i = 0; i < 10000; i ++ ) {
        //     var star = new THREE.Vector3();
        //     star.x = THREE.Math.randFloatSpread( 2000 );
        //     star.y = THREE.Math.randFloatSpread( 2000 );
        //     star.z = THREE.Math.randFloatSpread( 2000 );
        //     starsGeometry.vertices.push( star );
        
        // }
        // var starField = new THREE.Points( starsGeometry, starsMaterial );
        // this.add(backgroundMesh);
        return this;
    }

}