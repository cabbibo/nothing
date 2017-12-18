uniform sampler2D t_audio;
uniform sampler2D t_normal;
uniform sampler2D t_matcap;

varying vec3 vNorm;
varying vec2 vUv;
varying vec3 vMPos;
varying vec3 vEye;
varying vec3 vPos;


$uvNormalMap
$semLookup

$simplex

void main(){

	vec3 fNorm = uvNormalMap( t_normal , vPos , vUv  , vNorm , 1.4 , 1.1 );


  vec2 semLU = semLookup( normalize( vEye ) , vNorm );
  vec4 sem = texture2D( t_matcap , semLU );

  float n = snoise( vec3( vPos.x * 200. , vPos.y  * 10. , vPos.z * 200.));

 // vec4 audio = texture2D( t_audio , vec2( lamb , 0. ));
  gl_FragColor = vec4( vec3(length( abs(n) * sem.xyz * sem.xyz * .3)), 1. );


}
