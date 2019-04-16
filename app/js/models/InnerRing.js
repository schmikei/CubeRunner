import { CircleGeometry, MeshPhongMaterial, Mesh, Group} from 'three';

export default class InnerRing extends Group{
  constructor (radius) {
    super();

    const ringGeo = new CircleGeometry(radius, 23);
    const ringMat = new MeshPhongMaterial( {color: 0x000000, opacity: 0.0, transparent: true} );
    const ring = new Mesh( ringGeo, ringMat );
    this.add (ring);

     return this;
  }
}