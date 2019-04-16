import { SphereGeometry, MeshPhongMaterial, Mesh, Group} from 'three';
import * as THREE from 'three';


export default class Moon extends Group {
  constructor (radius) {
    super ();

    const moonGeo = new SphereGeometry(radius,100,100);
    var texture = new THREE.TextureLoader().load( "./app/js/models/moon.jpeg" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    const moonText = MeshPhongMaterial({ map: texture, overdraw: 0.5});
    const body = new Mesh( moonGeo, moonText );
    this.add(body);

    // default to "return this;"
    return this;
  }
} 