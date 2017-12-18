uniform sampler2D t_audio;
uniform sampler2D t_normal;
uniform sampler2D t_matcap;
uniform float heartDeath;
uniform float time;

varying vec3 vNorm;
varying vec2 vUv;
varying vec3 vMPos;
varying vec3 vEye;
varying vec3 vPos;


$uvNormalMap
$semLookup
$simplex

void main(){

	vec3 fNorm = vNorm; //uvNormalMap( t_normal , vPos , vUv  , vNorm , 4.1 , 1.1 );


  vec2 semLU = semLookup( normalize( vEye ) , fNorm );
  vec4 sem = texture2D( t_matcap , semLU );

  float n = abs(snoise( vMPos * 10. + vec3( 0.,time * .3,0.)));
  float n2 = abs(snoise( vMPos * 2. + vec3( 0.,time * .1,0.)));

  float fadeVal =  clamp( vEye.y-.5 + n + 3.*n2 ,0.,1.);
  vec3 c1 = vec3(length(sem.xyz) );//sem.xyz * vec3( 1.,.4,.4);
  vec3 c2 = vec3(length(sem.xyz) * length(sem.xyz));

  vec3 col = mix( c1 , c2 * .05 , fadeVal);

 // vec4 audio = texture2D( t_audio , vec2( lamb , 0. ));
  gl_FragColor = vec4( col , 1. );


}
