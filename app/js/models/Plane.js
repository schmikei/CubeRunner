import {DoubleSide, PlaneGeometry, MeshPhongMaterial, Mesh, Group, SphereGeometry} from 'three';
import * as THREE from 'three';

export default class Plane extends Group {
  constructor (width, height) {
    super(); 
    var geometry = new PlaneGeometry(width, height);
    var material = new MeshPhongMaterial( {color: 0xff88ff, side: DoubleSide} );
    var plane = new Mesh( geometry, material );
    this.add( plane );

    // default to "return this;"
  }
}