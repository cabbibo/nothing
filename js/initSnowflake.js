function initSnowflake(){
  var PARAMS = {

      guide:{
        
        lengthRandomness: .5,
        lengthMultiplier: .5,
        heightRandomness: .5,
        heightMultiplier: .5,
        widthRandomness: .5,
        widthMultiplier: .5,
        branchLateness: 100.8,//1.8,
        branches: 2,
        maxDepth: 2,
        branchChance: .8,
        minChildren: 3,
        maxChildren: 5,
        length: 1.,
        width: 1.,
        height: .1,
        position: 0,

      },

      guideRanges:{

        lengthRandomness: [ 0  , 1  ],
        lengthMultiplier: [ 0  , 1  ],
        heightRandomness: [ 0  , 1  ],
        heightMultiplier: [ 0  , 1  ],
        widthRandomness:  [ 0  , 1  ],
        widthMultiplier:  [ 0  , 1  ],
        branchLateness:   [ 0  , 1  ],//1.8,
        branches:         [ 1  , 20 ],
        maxDepth:         [ 1  , 10 ],
        branchChance:     [ 0  , 1  ],
        minChildren:      [ 1  , 10 ],
        maxChildren:      [ 11 , 30 ],
        length:           [ .1 , 2 ],
        width:            [ .1 , 2 ],
        height:           [ .1 , .2 ],
        position:         [  0 , 1 ]

      },

      branch:{

        length: 50,
        width:  20,
        height: 30,
        extraH:.5, 
        vDepth: .2,

        lengthRandomness: .001,
        widthRandomness: .001,
        heightRandomness: .001,
        angleRange:.001
        
      },

      branchRanges:{

        length: [ 20 , 100 ],
        width:  [ 10 , 60 ],
        height: [ 5 , 50  ],
        extraH: [ 0 , .5 ], 
        vDepth: [ 0 , .5 ],

        lengthRandomness: [ 0.00001 , .1 ],
        widthRandomness: [ 0.00001 , .1 ],
        heightRandomness: [ 0.00001 , .1 ],
        angleRange:[ 0.00001 , .1 ],        
      },

      randomSnowflake: function(){ nextSnowflake( true ); },
      nextSnowflake: function(){ nextSnowflake(); },

    }




   var attributes = {
      normal:{type:"v3" , value:null },
      fade: { type:"f" , value:null },
      edge: { type:"f" , value:null },
      id: { type:"f" , value:null }
    }
    var vs = shaders.vs.snow;
    var fs = shaders.fs.snow;


    snowflakeMaterial = new THREE.ShaderMaterial({

      uniforms: {
        filled:{type:"f",value:1},
        flakeID:{type:"f",value:Math.random()},
        t_matcap:G.uniforms.t_matcap,
        time:G.uniforms.time,
        golden:G.uniforms.golden,
        saturation:{type:"f",value:1}
      },
      vertexShader: vs,
      fragmentShader: fs,
      //side: THREE.DoubleSide
      //transparent: true,

    });

    function createSnowflake(){

      var geometry = new SnowflakeGeometry(
        PARAMS.guide,
        PARAMS.branch
      );

      snowflake = new THREE.Mesh( geometry , snowflakeMaterial );
     // scene.add( snowflake );

      /*var i = { v: 0 };
      var f = { v: PARAMS.guide.maxDepth * 2 }

      var t = new TWEEN.Tween( i ).to( f , (PARAMS.guide.maxDepth * 2 ) * 200 );

      t.onUpdate( function(){
        uniforms.filled.value = i.v;
      });

      t.onComplete( function(){

        //snowflakeFinished();

      });

      t.start();*/

      return snowflake

    }

    return createSnowflake();


}