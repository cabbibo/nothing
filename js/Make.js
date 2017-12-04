      function Make(){


        MakeText();

        controls.minPos     = -1000.7;
        controls.maxPos     =  0;
        controls.multiplier =  .000001 * textParticles.totalHeight;
        controls.dampening  = .95;


        links = [];
        for( var i = 0; i < linkInfo.length; i++ ){

         links[i] = new Link(font , linkInfo[i].title ,linkInfo[i].href  );
         links[i].add( new THREE.Vector3( 0,-i*.15 - 400.3, 0));

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





        //HEART
        G.models.flower1.material = new THREE.MeshNormalMaterial({
                side: THREE.DoubleSide
              });

        G.models.flower1.scale.multiplyScalar( .1);
        G.models.flower1.rotation.y = 1.5* Math.PI;
        G.models.flower1.position.y = -90;
        G.models.flower1.position.z = -30;

        G.story.AddQuantizedEvent( -54 , function(Up,pos,delta){

          if( Up == false ){
            scene.add(G.models.flower1)
          }
        });




        //HEART
        var sMat = new THREE.MeshBasicMaterial({color:"black"});
        var sGeo = new THREE.CylinderGeometry( 1 , 1, 1, 30 );

        var s = new THREE.Mesh( sGeo , sMat );
        s.rotation.x = Math.PI * .5;
        s.position.y = -7;
        s.position.z = -.5;

        scene.add( s );



        //WINDOW
        var l = new THREE.Vector3( 0 , -10.5,-2.5 );
        AddWindow( l )


        // SNOW top!
        var pf = ParticleField( 1000 , -2 , -10 , 3 , 100 );
        scene.add( pf );


        // DEATH RAYS
        var dr = DeathRays( 100 ,  -30 , -50 , 0 , 0 );
        scene.add( dr );





        //DEATH BARS
        var dbA = [
          [-35,.5],
          [-40,.5],
          [-44,.4],
          [-47,.2],
          [-49,.1],
          

          [-54,5],
        ]
        var dr = DeathBars( dbA );
        scene.add( dr );

       

     


      }