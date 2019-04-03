import { BoxGeometry, MeshBasicMaterial, Mesh, Group} from 'three';

export default class Box extends Group {
  constructor (scaler) {
    super ();

    const bodyGeo = new BoxGeometry( (1 * scaler), (1 * scaler), (1 * scaler) );
    let ran_color = Math.random();


    if (ran_color < .5){
       this.bodyMat = new MeshBasicMaterial( {color: 0xD1B58C} );
    }else{
       this.bodyMat = new MeshBasicMaterial( {color: 0x7A8B8B} );
    }
    
    const body = new Mesh( bodyGeo, this.bodyMat );
    this.add (body);

    // default to "return this;"
  }
} 