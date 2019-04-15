import {DoubleSide, PlaneGeometry, MeshPhongMaterial, Mesh, Group} from 'three';

export default class Plane extends Group {
  constructor (width, height) {
    super(); 

    var geometry = new PlaneGeometry( width, height);
    var material = new MeshPhongMaterial( {color: 0xff0000, side: DoubleSide} );
    var plane = new Mesh( geometry, material );
    this.add( plane );

    // default to "return this;"
  }
}