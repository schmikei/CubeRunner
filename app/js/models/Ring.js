import { TorusGeometry, MeshPhongMaterial, Mesh, Group} from 'three';

export default class Ring extends Group{
  constructor (radius, tubeRadius) {
    super();

    const ringGeo = new TorusGeometry(radius, tubeRadius, 8, 8 );
    const ringMat = new MeshPhongMaterial( {color: 0xFFD700} );
    const ring = new Mesh( ringGeo, ringMat );
    this.add (ring);

     return this;
  }
}