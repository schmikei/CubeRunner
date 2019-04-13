import { BoxGeometry, MeshPhongMaterial, Mesh, Group} from 'three';

export default class Ship extends Group {
  constructor (shipHeight, shipWidth, shipDepth) {
    super();

    //body of ship is a box
    const shipGeo = new BoxGeometry( shipWidth, shipHeight, shipDepth );
    const shipMat = new MeshPhongMaterial( {color: 0x344152} );
    const ship = new Mesh( shipGeo, shipMat );
    this.vertices = ship.geometry.vertices;
    console.log(this.vertices);
    this.add (ship);

    return this;
  }
}