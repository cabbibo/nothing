      function AddSnowflake( position ){

        console.log( position );
        
        var id = Math.floor( Math.random() * G.models.snowflakes.length);
        

        var SF = new THREE.Mesh( G.models.snowflakes[id].geometry ,new THREE.MeshNormalMaterial({
          side: THREE.DoubleSide
        }));

        SF.scale.multiplyScalar( 1.1);
        SF.rotation.y = 1.5* Math.PI;
        SF.position.y = position.y;
        SF.position.z = position.z;

        G.story.AddSmoothedEvent( position.y , position.y-1, function(val , pos , delta){
          SF.position.y = pos;
          SF.rotation.y += Math.abs(  val  )  * delta * 4;
        });

        scene.add( SF );

      }


      function AddWindow( position ){
        
        var id = Math.floor( Math.random() * G.models.snowflakes.length);
        

        var SF = new THREE.Mesh( G.models.window.geometry ,new THREE.MeshNormalMaterial({
          side: THREE.DoubleSide
        }));

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
          SF.position.z = SF.ogZ + 2 * val;
        });


        G.story.AddSmoothedEvent( position.y-3.5 , position.y-100.5, function(val , pos , delta){
          SF.position.y = pos;
        });

        scene.add( SF );

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