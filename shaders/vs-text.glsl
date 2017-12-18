
attribute vec4 textCoord;
attribute vec2 lookup;

uniform sampler2D t_lookup;
uniform float time; 
uniform float golden; 

varying vec4 vTextCoord;
varying vec2 vUv;
varying vec3 vNorm;
varying vec3 vMPos;
varying vec3 vEye;
varying float vDist;

$simplex

void main(){
  
  vUv         = uv;
  vTextCoord  = textCoord;
 
  vec3 tpos =  texture2D( t_lookup , lookup ).xyz;

  float dif = (tpos - cameraPosition).y;

  float n = 1.+snoise( (tpos + position ) * 2. + vec3(0., 0., time * .4) );

  vec3 weird = vec3( snoise( tpos * 20. ) , snoise( tpos * 13. ) , 0. );
 
  vec3 pos = vec3(0. , 0.,n * .04) * (golden + .4) + tpos + position + weird * min( pow( abs(dif), 4.) , 1. ) * .8;

  vMPos = ( modelMatrix * vec4( pos , 1. ) ).xyz;

  vec4 mvPos = modelViewMatrix * vec4( pos , 1.0 );
 
  gl_Position = projectionMatrix * mvPos;

  vDist = length( mvPos );

  vEye = vMPos - cameraPosition;

}
