import { TorusGeometry, MeshBasicMaterial, Mesh, Group} from 'three';

export default class Ring {
  constructor (radius, tubeRadius) {

    const ringGeo = new TorusGeometry(radius, tubeRadius, 8, 8 );
    const ringMat = new MeshBasicMaterial( {color: 0xD1B58C} );
    const ring = new Mesh( bodyGeo, bodyMat );
    this.add (ring);

    // default to "return this;"
  }
}