import {DoubleSide, PlaneGeometry, MeshBasicMaterial, Mesh, Group} from 'three';

export default class Plane extends Group {
  constructor (width, height) {
    super(); 

    var geometry = new PlaneGeometry( width, height);
    var material = new MeshBasicMaterial( {color: 0xff0000, side: DoubleSide} );
    var plane = new Mesh( geometry, material );
    this.add( plane );

    // default to "return this;"
  }
}