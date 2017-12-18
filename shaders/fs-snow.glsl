uniform sampler2D t_matcap;
uniform float filled;
uniform float flakeID;
uniform float golden;

  
varying vec2 vSEM;
varying vec3 vEye;
varying vec3 vNorm;
varying float vFR;

varying float vFade;
varying float vEdge;
varying float vID;
varying vec3 vPos;


vec3 hsv(float h, float s, float v)
{
    
  return mix( vec3( 1.0 ), clamp( ( abs( fract(
    h + vec3( 3.0, 2.0, 1.0 ) / 3.0 ) * 6.0 - 3.0 ) - 1.0 ), 0.0, 1.0 ), s ) * v;
}


void main(){

  vec4 sem = texture2D( t_matcap , vSEM );

  vec4 whoa =  vec4(hsv( flakeID * 1000. + vPos.z * .04, 1. , 1.),1.);
  vec4 nCol =  vec4( vNorm * .3 + .9 , 1. ) * mix(vec4(1.,0.,0.,1.) , vec4(1.,.4,0.,1.) , vID * .2 + vPos.z * .2);

  vec4 color = nCol * sem;// + nCol * pow(( 1.-abs(vFR)) , 10. );

  if( vID + vFade*( 1. + vEdge )> filled ){

    //color.w =  0. ;

  }


  gl_FragColor =2.* color;// + vEdge * vEdge * vEdge * (vec4( 1.1 ) - color);// vec4( 1. , 0. , 1. , 1. );// vec4( normalize( vNorm ) , 1. );
 // gl_FragColor = vEdge * vec4( 1., 0. , 0. , 1. ) + vec4( 0. , 0. , 1. , 0. );//* color;// vec4( 1. , 0. , 1. , 1. );// vec4( normalize( vNorm ) , 1. );
  //gl_FragColor =vec4( vec3(max( 0. ,  dot( vNorm , vec3( 1. , 0. , 0. ) ))) , 1. );//* color;// vec4( 1. , 0. , 1. , 1. );// vec4( normalize( vNorm ) , 1. );
 // gl_FragColor =vec4( vec3( vFade , 0. , 0. )+ vec3( 0. , 0. , 1. ) , 1. );//* color;// vec4( 1. , 0. , 1. , 1. );// vec4( normalize( vNorm ) , 1. );
  
//  gl_FragColor =vec4( 1. );// vec4( 1. , 0. , 1. , 1. );// vec4( normalize( vNorm ) , 1. );

}
