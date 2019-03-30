import { BoxGeometry, MeshBasicMaterial, Mesh, Group} from 'three';

export default class Box extends Group {
  constructor (scaler) {
    super ();

    const bodyGeo = new BoxGeometry( (1 * scaler), (1 * scaler), (1 * scaler) );
    const bodyMat = new MeshBasicMaterial( {color: 0xD1B58C} );
    const body = new Mesh( bodyGeo, bodyMat );
    this.add (body);

    // default to "return this;"
  }
} 