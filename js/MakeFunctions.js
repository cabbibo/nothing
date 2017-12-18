      function AddSnowflake( position ){

        console.log( position );
        
        var id = Math.floor( Math.random() * G.models.snowflakes.length);
        

        var SF = initSnowflake();

        console.log( SF );

        /* new THREE.Mesh( G.models.snowflakes[id].geometry ,new THREE.MeshNormalMaterial({
          side: THREE.DoubleSide
        }));*/



        SF.scale.multiplyScalar( .005);
        SF.rotation.y = 1.5 * Math.PI - 1;
        SF.position.y = position.y;
        SF.rotation.z = .4;
        SF.position.z = position.z;

        G.story.AddSmoothedEvent( position.y , position.y-1, function(val , pos , delta){
          SF.position.y = pos;
          SF.rotation.y -= Math.abs(  val  )  * delta * 4;
        });

        scene.add( SF );

      }


      function AddWindow( position ){
        
        var id = Math.floor( Math.random() * G.models.snowflakes.length);
        


        var mat = new THREE.ShaderMaterial({
          vertexShader: shaders.vs.window,
          fragmentShader: shaders.fs.window,
          uniforms: G.uniforms,
        });

        var SF = new THREE.Mesh( G.models.window.geometry , mat);

        SF.scale.multiplyScalar( 4.1);
        SF.rotation.y = Math.PI / 2;
        SF.position.y = position.y;
        SF.position.z = position.z;

        SF.ogZ = position.z;

        G.story.AddSmoothedEvent( position.y , position.y-1.5, function(val , pos , delta){
          SF.position.y = pos;
        });


        G.story.AddSmoothedEvent( position.y-1.5 , position.y-3.5, function(val , pos , delta){
          SF.position.y = pos;
          SF.position.z = SF.ogZ + 4 * val;
        });

        G.story.AddQuantizedEvent(position.y-3.5 , function(Up,pos,delta){
          if( Up == false ){
            scene.remove( SF );
          }else{
            scene.add( SF );
          }
        });

      
        scene.add( SF );

      }

      function AddDude( position ){
        
        var id = Math.floor( Math.random() * G.models.snowflakes.length);
        

        var SF = new THREE.Object3D();

        var geo = new THREE.PlaneGeometry(4,3);
        var mat = new THREE.ShaderMaterial({
          vertexShader: shaders.vs.eyes,
          fragmentShader: shaders.fs.eyes,
          uniforms: G.uniforms,
          transparent: true
          //side: THREE.DoubleSide
        });
        
        var eye1 = new THREE.Mesh(geo ,mat);
        var eye2 = new THREE.Mesh(geo ,mat);


        eye1.scale.multiplyScalar( .2 );
        eye2.scale.multiplyScalar( .2 );
        eye1.position.x = -.5;
        eye2.position.x = .5;


        SF.add( eye1 );
        SF.add( eye2 );


        eye1.update = function(){
 
          this.updateMatrixWorld();
          G.uniforms.iModelMat.value.getInverse( this.matrixWorld );

        }.bind( eye1 );


        SF.position.y = position.y;
        SF.position.z = position.z - 1;

        SF.ogZ = SF.position.z;

        G.eye = eye1;

        G.story.AddSmoothedEvent( position.y , position.y-1.5, function(val , pos , delta){
          SF.position.y = pos;
        });


        G.story.AddSmoothedEvent( position.y-1.5 , position.y-3.5, function(val , pos , delta){
          SF.position.y = pos;
          SF.position.z = SF.ogZ + 3 * val;
        });

        // DYING
        G.story.AddSmoothedEvent( position.y-3.5 , position.y-6.5, function(val , pos , delta){
          SF.position.y = pos;
          //SF.position.z = SF.ogZ + 3 * val;

          G.uniforms.eyesClosed.value = val * .5;
        });


        // DEATH Back
        G.story.AddSmoothedEvent( position.y-6.5 , position.y-16.5, function(val , pos , delta){
          SF.position.y = pos;
          SF.position.z = SF.ogZ + 3 - 5 * (val * val);
          G.uniforms.eyesClosed.value = .5 + val * .5;
        });

        //Death  Down
        G.story.AddSmoothedEvent( position.y-16.5 , position.y-120.5, function(val , pos , delta){
          SF.position.y = pos;
        });

        G.story.AddSmoothedEvent( position.y-120.5 , position.y-130.5, function(val , pos , delta){
          SF.position.z = SF.ogZ - 2 - val * val * 7;
          SF.position.y = pos;
          G.uniforms.eyesClosed.value = 1-val;
        });
      
        scene.add( SF );


        G.story.AddQuantizedEvent( position.y - 16.5 , function(Up,pos,delta){
          if( Up == false ){
            scene.remove(SF)
          }else{
            scene.add(SF)
          }
        });


        G.story.AddQuantizedEvent( position.y - 120.5 , function(Up,pos,delta){
          if( Up == false ){
            scene.add(SF)
          }else{
            scene.remove(SF)
          }
        });

      

      }

      function MakeText(){


        var vs = shaders.vertexShaders.text;
        var fs = shaders.fragmentShaders.text;


        // Passage comes from seperate file
        textParticles = new TextParticles( noThing , font , vs , fs , {
         letterWidth: .03,
         lineLength: 50,
         uniforms:{
          time: time,
         }  
        });
        
        scene.add( textParticles );

        // centers text
        textParticles.position.x = - textParticles.totalWidth / 2;

      }


      function FadeLoop(buffer, peakVolume , fadeInStart, fadeInEnd , fadeOutStart, fadeOutEnd ){

        var gain = G.audio.ctx.createGain();

        gain.connect( G.audio.gain );
        

        var playback = new BufferedAudio( buffer , G.audio.ctx , gain , true );
        playback.play();
        gain.gain.value = 0;

        G.story.AddSmoothedEvent( fadeInStart,fadeInEnd,function(value){
            gain.gain.value = value * peakVolume;
        });

        G.story.AddSmoothedEvent( fadeInEnd,fadeOutStart,function(value){
            gain.gain.value = peakVolume;
        });

        G.story.AddSmoothedEvent(  fadeOutStart,fadeOutEnd,function(value){
            gain.gain.value = (1-value) * peakVolume;
        });

        G.story.AddScrollEvent(function(){

          var c  = camera.position.y;

          if( c >= fadeInStart || c <= fadeOutEnd ){
            gain.gain.value = 0;
          }

        })


      }