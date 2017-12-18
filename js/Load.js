
function LoadItAll(){

  
  loadOBJ( 'models/heart/heartNoBG.obj', function(child){
    G.models.heart = child;
  })

  loadOBJ( 'models/hourGlass/hour\ glass.obj', function(child){
    G.models.hourGlass = child;
  })


  loadOBJ( 'models/window/window.obj', function(child){
    G.models.window = child;
  })


  loadOBJ( 'models/flower1.obj', function(child){
    G.models.flower1 = child;
  })

  loadOBJ( 'models/tentacle1.obj', function(child){
    G.models.tentacle1 = child;
  })

  G.models.snowflakes = [];
  loadOBJ( 'models/snowflakes/snow1.obj', function(child){
    G.models.snowflakes[0] = child;
  })
    


  loadAudio( "pure" ,"sounds/pureSound.mp3" );
  loadAudio( "crackle" ,"sounds/crackleSound.mp3" );
  loadAudio( "slippery" ,"sounds/slipperySound.mp3" );
  loadAudio( "tang" ,"sounds/tangSound.mp3" );


  loadAudio( "enviornment1" ,"sounds/enviornment1.mp3" );
  loadAudio( "enviornment2" ,"sounds/enviornment2.mp3" );
  loadAudio( "enviornment3" ,"sounds/enviornment3.mp3" );
  loadAudio( "enviornment4" ,"sounds/enviornment4.mp3" );

  loadAudio( "hit1" ,"sounds/logoHit1.wav" );
  loadAudio( "hit2" ,"sounds/logoHit2.wav" );

  loadAudio( "glass1" ,"sounds/glass1.wav" );
  loadAudio( "glass2" ,"sounds/glass2.wav" );
  loadAudio( "glass3" ,"sounds/glass3.wav" );

  loadAudio( "heartbeat", "sounds/heartbeat.wav" );
  loadAudio( "drone1", "sounds/drone1.wav" );
  loadAudio( "worle2", "sounds/worle2.wav" );
  loadAudio( "tone", "sounds/tone.wav" );


  loadAudio( "logo" ,"sounds/logoSound.wav" );
  loadAudio( "logoHit" ,"sounds/hitSound.wav" );
  loadAudio( "whoosh" ,"sounds/whoosh.wav" );




  neededToLoad += 1;
  shaders.shaderSetLoaded = function(){
    onLoad();
  }


  shaders.load( 'vs-text' , 'text' , 'vertex'   );
  shaders.load( 'fs-text' , 'text' , 'fragment' );

  shaders.load( 'vs-title' , 'title' , 'vertex'   );
  shaders.load( 'fs-title' , 'title' , 'fragment' );

  shaders.load( 'vs-tentacles' , 'tentacles' , 'vertex' );
  shaders.load( 'fs-tentacles' , 'tentacles' , 'fragment');


  shaders.load( 'vs-eyes' , 'eyes' , 'vertex' );
  shaders.load( 'fs-eyes' , 'eyes' , 'fragment');

  shaders.load( 'vs-snow' , 'snow' , 'vertex' );
  shaders.load( 'fs-snow' , 'snow' , 'fragment');


  shaders.load( 'vs-heart' , 'heart' , 'vertex' );
  shaders.load( 'fs-heart' , 'heart' , 'fragment');


  shaders.load( 'vs-window' , 'window' , 'vertex' );
  shaders.load( 'fs-window' , 'window' , 'fragment');

  shaders.load( 'vs-gold' , 'gold' , 'vertex' );
  shaders.load( 'fs-gold' , 'gold' , 'fragment');

  loadTexture('img/rough-aluminium.jpg',function(texture){
    G.uniforms.t_matcap.value = texture
  });


  loadTexture('img/icons/cabbibo.png',function(texture){
    G.logoTexture = texture
  });

  //shaders.load( 'vs-light' , 'light' , 'vertex');
  //shaders.load( 'fs-light' , 'light' , 'fragment');


}



function loadAudio( name , file ){
  neededToLoad += 1;
  G.audio.buffers[name] = new AudioBuffer( G.audio , file );
  G.audio.buffers[name].addLoadEvent( function(){ onLoad(); });

}

function loadOBJ( file , callback ){

  neededToLoad += 1;

  loader.load( file, function ( object ) {

    object.traverse( function ( child ) {

      if ( child instanceof THREE.Mesh ) {
        callback(child);
      }else{
        console.log("NOPE");
      }

    });

    onLoad();

  });

}

function loadTexture( file , callback ){

  neededToLoad += 1;


  tLoader.load(file,function(texture){
    onLoad();
    callback(texture);
  });

}



function onLoad(){
  loaded ++;

  loadDiv.style.width = (( loaded / neededToLoad ) * window.innerWidth) + "px" 

  if( neededToLoad == loaded ){
    init();
    //animate(); 
  }
}


     