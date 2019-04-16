import { SphereGeometry, MeshPhongMaterial, Mesh, Group, SphereBufferGeometry, BoxGeometry, CircleGeometry} from 'three';
import * as THREE from 'three';


export default class Moon extends Group {
  constructor (radius, numVert) {
    super ();
<<<<<<< HEAD
    console.log(process.cwd());
=======
    console.log(process.cwd())
>>>>>>> 219250157650771d4d78d8a7e26cf224f03de186
    const moonGeo = new CircleGeometry(radius, numVert, numVert);
    var texture = new THREE.TextureLoader().load( "./images/moon.jpeg" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;


    var tex = texture.clone();
    tex.needsUpdate = true;
    const moonText = new MeshPhongMaterial( {map: texture});
    const body = new Mesh( moonGeo, moonText );
    this.add(body);

    return this;
  }
} 
