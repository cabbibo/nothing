
uniform float time;
uniform float eyesClosed;

uniform float scrollVal;

varying vec3 vNorm;
varying vec2 vUv;
varying vec3 vMPos;
varying vec3 vEye;
varying vec3 vPos;

float random (in vec2 st) { 
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st, in float edges) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile, restricting the domain of the space
    float a = random(mod(i,edges));
    float b = random(mod(i + vec2(1.0, 0.0), edges));
    float c = random(mod(i + vec2(0.0, 1.0), edges));
    float d = random(mod(i + vec2(1.0, 1.0), edges));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners porcentages
    return mix(a, b, u.x) + 
            (c - a)* u.y * (1.0 - u.x) + 
            (d - b) * u.x * u.y;
}

float fbm(in vec2 x, in float edges)
{
  float sum = 0.;
    const int iterations = 4;
    float amp = .5;
    float freq = 2.0;
    
    for (int i = 0; i < iterations; i++)
    {
        sum += noise(x*freq, edges)*amp;
        amp *= 0.5;
        freq*= 2.;
    }
    return sum;
}

void main(){

    float retinaRadius = 0.35;
    float retinaFade = 0.15;
    vec3 retinaColor = vec3(0.00);

    float eyeballRadius = 1.0;
    vec3 eyeballColor = vec3(1.);
    
    float noiseEdges = 32.;

    float open = .9-eyesClosed * .5;//sin(time)*0.5+0.5;
    
    
    vec2 uv = vUv;
    vec2 puv = (uv * 2.2 - 1.1);

    puv.x *= (5./3.);

    float l = length(puv);
    float angle = (atan(puv.y, puv.x)/3.14159)*noiseEdges*0.25;
    float n = fbm(vec2(l*2.,angle)*1., noiseEdges)*2.;
    vec3 col = vec3(fbm(vec2(l-scrollVal * 100.,n),noiseEdges));
    col = col;//sin(col*vec3(.0,0.66,.66)+n*4. + l*5. + time)*0.5+0.4;
   // if( scrollVal > .6 ){
    col = abs(col);
        col = abs(sin(col * 10.));

    if( scrollVal > .6){ 
        col = vec3(col.x *.5 + .8,.5 * col.x + .4,0.);
    }
    
    vec2 retinaPosition = puv + vec2(0., (1.0-open)*0.15);
    float retinaLength = length(retinaPosition);


    col = mix(retinaColor,col, smoothstep(retinaRadius, retinaRadius+retinaFade, retinaLength)); 
    col = mix(col,eyeballColor,smoothstep(eyeballRadius, eyeballRadius+retinaFade, retinaLength)); 
   
    col = mix(col, vec3(0.), smoothstep(open,open+0.05, uv.y + open*1.*(-cos((uv.x-.5)*3.14159*1.)*0.5+0.5) ));
    col = mix(col, vec3(0.), smoothstep(open,open+0.05, 1.-uv.y + open*1.*(-cos((uv.x-.5)*3.14159*1.)*0.5+0.5) ));
    
    /*if( retinaLength > 1.){
        discard;
    }*/


    
 // vec4 audio = texture2D( t_audio , vec2( lamb , 0. ));
  gl_FragColor = vec4( col , 1.  );


}
