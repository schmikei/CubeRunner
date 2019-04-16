import { SphereGeometry, MeshPhongMaterial, Mesh, Group, SphereBufferGeometry, BoxGeometry, CircleGeometry} from 'three';
import * as THREE from 'three';


export default class Moon extends Group {
  constructor (radius, numVert) {
    super ();
    console.log(process.cwd())
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