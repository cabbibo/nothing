
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


  G.models.snowflakes = [];
  loadOBJ( 'models/snowflakes/snow1.obj', function(child){
    G.models.snowflakes[0] = child;
  })
    


 

  loadAudio( "pure" ,"sounds/pureSound.mp3" );
  loadAudio( "crackle" ,"sounds/crackleSound.mp3" );
  loadAudio( "slippery" ,"sounds/slipperySound.mp3" );
  loadAudio( "tang" ,"sounds/tangSound.mp3" );

  loadAudio( "hit1" ,"sounds/logoHit1.wav" );
  loadAudio( "hit2" ,"sounds/logoHit2.wav" );


  loadAudio( "logo" ,"sounds/logoSound.wav" );
  loadAudio( "logoHit" ,"sounds/hitSound.wav" );




  neededToLoad += 1;
  shaders.shaderSetLoaded = function(){
    onLoad();
  }


  shaders.load( 'vs-text' , 'text' , 'vertex'   );
  shaders.load( 'fs-text' , 'text' , 'fragment' );

  shaders.load( 'vs-title' , 'title' , 'vertex'   );
  shaders.load( 'fs-title' , 'title' , 'fragment' );


  shaders.load( 'vs-gem' , 'gem' , 'vertex'   );
  shaders.load( 'fs-gem' , 'gem' , 'fragment' );

  shaders.load( 'vs-ray' , 'ray' , 'vertex'   );
  shaders.load( 'fs-ray' , 'ray' , 'fragment' );

  shaders.load( 'vs-darkness' , 'darkness' , 'vertex'   );
  shaders.load( 'fs-darkness' , 'darkness' , 'fragment' );


  shaders.load( 'vs-connections' , 'connections' , 'vertex'   );
  shaders.load( 'fs-connections' , 'connections' , 'fragment' );


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
      }

    });

    onLoad();

  });

}


function onLoad(){
  loaded ++;
  if( neededToLoad == loaded ){
    init();
    animate(); 
  }
}


     