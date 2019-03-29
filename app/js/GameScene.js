import { BoxGeometry, MeshBasicMaterial, Mesh, Group} from 'three';
import Box from './models/Box';
import Ring from './models/Ring';
import Plane from './models/Plane';
export default class GameScene {
  constructor (scaler) {

    const bodyGeo = new BoxGeometry( (1 * scaler), (1 * scaler), (1 * scaler) );
    const bodyMat = new MeshBasicMaterial( {color: 0xD1B58C} );
    const body = new Mesh( bodyGeo, bodyMat );
    this.add (body);

    // default to "return this;"
  }
} 