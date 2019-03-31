import { BoxGeometry, MeshPhongMaterial, Mesh, Group} from 'three';

export default class Ship extends Group {
  constructor (tempSize) {
    super();

    //body of ship is a box
    const shipGeo = new BoxGeometry( tempSize, tempSize, tempSize );
    const shipMat = new MeshPhongMaterial( {color: 0xD1B58C} );
    const ship = new Mesh( shipGeo, shipMat );
    this.add (ship);

    return this;
  }
}