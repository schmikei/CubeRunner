import { BoxGeometry, SphereGeometry, CylinderGeometry, ConeGeometry, MeshPhongMaterial, Mesh, Group} from 'three';

export default class Ship extends Group {
  constructor (shipRadius, shipHeight, shipSegments) {
    super();

    const shipBoxGeo = new BoxGeometry(8, 5, 8, 3, 3, 3);
    const shipGeo = new ConeGeometry(shipRadius, shipHeight, shipSegments);
    const shipGeo2 = new ConeGeometry(shipRadius, shipHeight/2, shipSegments);
    const shipGeoHead = new SphereGeometry(2.5, 12, 12, 0, 3.15);

    const shipMat = new MeshPhongMaterial( {color: 0x344152} );
    const shipGlass = new MeshPhongMaterial( {color: 0xa4dded} );

    const shipBox = new Mesh( shipBoxGeo, shipMat );
    const shipHead = new Mesh( shipGeoHead, shipGlass );
    const shipUpper = new Mesh( shipGeo, shipMat );
    const shipLower = new Mesh( shipGeo2, shipMat );

    shipLower.rotateX(Math.PI);
    shipLower.translateY(1.5);
    shipHead.rotateX(-(Math.PI/2));

    this.vertices = shipBox.geometry.vertices;
    this.add (shipUpper);
    this.add (shipLower);
    this.add (shipHead);
    //this.add (shipBox);

    return this;
  }
}