function DeathRays( number , start , end , fade , fadeNum){
  

  var mat = new THREE.PointsMaterial({
    size:.03,
    blending:THREE.AdditiveBlending
  });


  var geo = new THREE.BoxGeometry(1,1,1);
  var mat = new THREE.MeshBasicMaterial();


  var m = new THREE.Object3D(); 
  for ( i = 0; i < number; i ++ ) {
    var vertex = new THREE.Vector3();
    vertex.z = (Math.random() - .5) * 4 - 2;
    vertex.x = (Math.random() - .5) * 3 * (vertex.z - 1)
    vertex.y = Math.random() * (end-start) + start;

    var box = new THREE.Mesh( geo , mat );
    box.position.copy(vertex);
    box.scale.z = .01;
    box.scale.x = .01;
    box.scale.y = .4 + Math.random() * .5;
    m.add( box );
  }


  // top fade
  for ( i = 0; i < fadeNum; i ++ ) {
    var vertex = new THREE.Vector3();
    vertex.z = (Math.random() - .5) * 4 - 2;
    vertex.x = (Math.random() - .5) * 3 * (vertex.z - 1)
    vertex.y = ((Math.random() * Math.random())) * fade + start;
    var box = new THREE.Mesh( geo , mat );
    box.position.copy(vertex);
    box.scale.z = .01;
    box.scale.x = .01;
    box.scale.y = .4 + Math.random() * .5;
    m.add( box );
  }

  // bottom fade
  for ( i = 0; i < fadeNum; i ++ ) {
    var vertex = new THREE.Vector3();
    vertex.z = (Math.random() - .5) * 4 - 2;
    vertex.x = (Math.random() - .5) * 3 * (vertex.z - 1)
    vertex.y = -(Math.random() * Math.random()) * (fade) + end;
    var box = new THREE.Mesh( geo , mat );
    box.position.copy(vertex);
    box.scale.z = .01;
    box.scale.x = .01;
    box.scale.y = .4 + Math.random() * .5;
    m.add( box );
  }





  //console.log( geo );

  return m;
  

}