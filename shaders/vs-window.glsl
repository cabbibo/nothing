uniform sampler2D t_audio;
uniform float time;

varying vec3 vNorm;
varying vec2 vUv;
varying vec3 vPos;
varying vec3 vMPos;
varying vec3 vEye;




void main(){

  vNorm = normal;//( modelMatrix * vec4( normal , 0. )).xyz;
  vUv   = uv;
  vPos  = position;
  vMPos  = ( modelMatrix * vec4( vPos , 1.  )).xyz;

  vEye = vMPos - cameraPosition;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( vPos, 1. );

}