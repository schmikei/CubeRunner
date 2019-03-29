import {DoubleSide, PlaneGeometry, MeshBasicMaterial, Mesh, Group} from 'three';

export default class Plane {
  constructor (width, height) {

    var geometry = new PlaneGeometry( width, height);
    var material = new MeshBasicMaterial( {color: 0xffff00, side: DoubleSide} );
    var plane = new THREE.Mesh( geometry, material );
    this.add( plane );

    // default to "return this;"
  }
}