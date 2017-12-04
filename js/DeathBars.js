function DeathBars( array ){

  var geo = new THREE.BoxGeometry(1,1,1);
  var mat = new THREE.MeshBasicMaterial();

  var m = new THREE.Object3D();
  for( var i = 0; i < array.length; i++ ){

    var box = new THREE.Mesh( geo , mat );

    box.position.x = 0;
    box.position.y = array[i][0];
    box.position.z = -2
    box.scale.z = array[i][1];
    box.scale.y = array[i][1];
    box.scale.x = 100;

    m.add(box);

  }

  return m;
  
}