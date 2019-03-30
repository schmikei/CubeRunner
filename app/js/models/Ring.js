import { TorusGeometry, MeshBasicMaterial, Mesh, Group} from 'three';

export default class Ring extends Group{
  constructor (radius, tubeRadius) {

    const ringGeo = new TorusGeometry(radius, tubeRadius, 8, 8 );
    const ringMat = new MeshBasicMaterial( {color: 0xD1B58C} );
    const ring = new Mesh( ringGeo, ringMat );
    this.add (ring);

     return this;
  }
}