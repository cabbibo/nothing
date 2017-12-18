
uniform float time;
uniform float flakeID;

attribute float fade;
attribute float edge;
attribute float id;


varying vec2 vSEM;
varying vec3 vEye;
varying vec3 vNorm;
varying vec3 vPos;
varying float vFR;

varying float vFade;
varying float vEdge;
varying float vID;

$semLookup
$simplex

void main(){

  float n = snoise( position  * .01  + vec3( 0. , 0., time * .3 + flakeID * 100. ));
  vec3 fPos = position + vec3( 0. , 0. , 2.) * n;
 
  vec4 mvPos = modelViewMatrix * vec4( fPos, 1.0 );
  
  vFade = fade;
  vEdge = edge;

  vID = id;
  
  vPos = fPos;
  vEye = normalize( mvPos.xyz );
  vNorm = normalize(normalMatrix * normal);

  vFR = dot( vEye , vNorm );
  
  vSEM = semLookup( vEye , vNorm );

  gl_Position = projectionMatrix * mvPos;

}
