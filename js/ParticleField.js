function ParticleField( number , start , end , fade , fadeNum){
  

  var mat = new THREE.PointsMaterial({
    size:.03,
    blending:THREE.AdditiveBlending
  });


  var geo = new THREE.Geometry();

  for ( i = 0; i < number; i ++ ) {
    var vertex = new THREE.Vector3();
    vertex.z = (Math.random() - .5) * 4 - 2;
    vertex.x = (Math.random() - .5) * 3 * (vertex.z - 1)
    vertex.y = Math.random() * (end-start) + start;
    geo.vertices.push( vertex );
  }


  // top fade
  for ( i = 0; i < fadeNum; i ++ ) {
    var vertex = new THREE.Vector3();
    vertex.z = (Math.random() - .5) * 4 - 2;
    vertex.x = (Math.random() - .5) * 3 * (vertex.z - 1)
    vertex.y = ((Math.random() * Math.random())) * fade + start;
    geo.vertices.push( vertex );
  }

  // bottom fade
  for ( i = 0; i < fadeNum; i ++ ) {
    var vertex = new THREE.Vector3();
    vertex.z = (Math.random() - .5) * 4 - 2;
    vertex.x = (Math.random() - .5) * 3 * (vertex.z - 1)
    vertex.y = -(Math.random() * Math.random()) * (fade) + end;
    geo.vertices.push( vertex );
  }



  //console.log( geo );

  var particles = new THREE.Points( geo , mat );
  return particles;
  

}