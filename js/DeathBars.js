function DeathBars( array ){

  var geo = new THREE.BoxGeometry(1,1,1);
  var mat = new THREE.MeshBasicMaterial();

  var m = new THREE.Object3D();
  for( var i = 0; i < array.length; i++ ){

    var box = new THREE.Mesh( geo , mat );

    box.position.x = 0;//-50.3;
    box.position.y = array[i][0];
    box.position.z = -2
    box.scale.z = .4;
    box.scale.y = array[i][1];
    box.scale.x = 100;

    m.add(box);


  var speed = 1 / array[i][1]


   var info = {
    speed:1/array[i][1],
    volume: 1
   }
   G.story.AddQuantizedEvent( array[i][0] + 1 + i* .3, function(UD,pos,delta){
    console.log(this);
    G.audio.play( G.audio.buffers.whoosh.buffer , this.speed , this.volume  );
  }.bind( info));


   /* var box = new THREE.Mesh( geo , mat );

    box.position.x = 50.3;
    box.position.y = array[i][0];
    box.position.z = -2
    box.scale.z = .4;
    box.scale.y = array[i][1];
    box.scale.x = 100;

    m.add(box);*/

  }

  return m;
  
}