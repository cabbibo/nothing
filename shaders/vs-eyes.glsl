uniform sampler2D t_audio;
uniform float time;
uniform mat4 iModelMat;

varying vec3 vNorm;
varying vec2 vUv;
varying vec3 vPos;
varying vec3 vMPos;
varying vec3 vEye;
varying vec3 vCam;


$simplex



void main(){

  vNorm = normal;//( modelMatrix * vec4( normal , 0. )).xyz;
  vUv   = uv;
  vPos  = position;
  vMPos  = ( modelMatrix * vec4( vPos , 1.  )).xyz;

  vEye = vPos - cameraPosition;
  vCam = ( iModelMat * vec4( cameraPosition , 1. ) ).xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( vPos, 1. );

}