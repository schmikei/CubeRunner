import { CubeGeometry, MeshPhongMaterial, Mesh, Group} from 'three';

export default class Ship extends Group {
  constructor (shipHeight, shipWidth, shipDepth) {
    super();

    //body of ship is a box
    const shipGeo = new CubeGeometry( shipWidth, shipHeight, shipDepth, 3, 3, 3 );
    const shipMat = new MeshPhongMaterial( {color: 0x344152} );
    const ship = new Mesh( shipGeo, shipMat );
    this.vertices = ship.geometry.vertices;
    this.add (ship);

    return this;
  }
}