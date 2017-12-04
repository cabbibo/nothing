      function Make(){


        MakeText();

        controls.minPos     = -100.7;
        controls.maxPos     =  0;
        controls.multiplier =  .000001 * textParticles.totalHeight;
        controls.dampening  = .95;


        links = [];
        for( var i = 0; i < linkInfo.length; i++ ){

         links[i] = new Link(font , linkInfo[i].title ,linkInfo[i].href  );
         links[i].add( new THREE.Vector3( 0,-i*.15 - 100.3, 0));

        }




     


        // FIRST SNOWFLAKE
        var l = new THREE.Vector3( 0 , -0,-.5 );
        AddSnowflake( l )


        G.story.AddQuantizedEvent( -.2 , function(UD,pos,delta){
          G.audio.play( G.audio.buffers.logoHit.buffer , 1 );
        });

        G.story.AddQuantizedEvent( -1 , function(UD,pos,delta){
          G.audio.play( G.audio.buffers.logo.buffer , 1);
        });



        //HEART
        G.models.heart.material = new THREE.MeshNormalMaterial({
                side: THREE.DoubleSide
              });

        G.models.heart.scale.multiplyScalar( .1);
        G.models.heart.rotation.y = 1.5* Math.PI;
        G.models.heart.position.y = -3.5;
        G.models.heart.position.z = -1;

        scene.add( G.models.heart );



        //WINDOW
        var l = new THREE.Vector3( 0 , -10.5,-2.5 );
        AddWindow( l )
       

     


      }