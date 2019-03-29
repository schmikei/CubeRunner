import { BoxGeometry, MeshBasicMaterial, Mesh, Group} from 'three';

export default class Ship {
  constructor () {

    const shipGeo = new BoxGeometry( 30, 30, 30 );
    const shipMat = new MeshPhongMaterial( {color: 0xD1B58C} );
    const ship = new Mesh( shipGeo, shipMat );
    this.add (ship);

    // default to "return this;"
  }
}