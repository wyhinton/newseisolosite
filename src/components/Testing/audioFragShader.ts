const audioFragShader = /*glsl*/ `
// #version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform sampler2D audioData;
uniform sampler2D u_image0;
uniform sampler2D u_image1;
uniform float u_time;

vec2 matcap(vec3 eye, vec3 normal) {
  vec3 reflected = reflect(eye, normal);
  float m = 2.8284271247461903 * sqrt( reflected.z+1.0 );
  return reflected.xy / m + 0.5;
}

mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
	mat4 m = rotationMatrix(axis, angle);
	return (m * vec4(v, 1.0)).xyz;
}

float sdCapsule( vec3 p, vec3 a, vec3 b, float r )
{
  vec3 pa = p - a, ba = b - a;
  float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
  return length( pa - ba*h ) - r;
}

float sdf(vec3 p){
    vec3 p1 = rotate(p, vec3(1.), u_time/5.);
    // vec2 uv =  (-u_resolution.xy + 2.0 * gl_FragCoord.xy)/u_resolution.y;
    vec2 uv =  gl_FragCoord.xy/u_resolution.xy;
    vec4 displacement = texture2D(audioData, uv);
    float sdCapsule = sdCapsule(p, vec3(-1., -0., -0.), vec3(1., 0., 0.), displacement.x);
    // float sdCapsule = sdCapsule(p, vec3(-1., -0., -0.), vec3(1., 0., 0.), displacement.x);
    return sdCapsule;
}


vec3 calcNormal( in vec3 p ) // for function f(p)
{
    const float eps = 0.0001; // or some other value
    const vec2 h = vec2(eps,0);
    return normalize( vec3(sdf(p+h.xyy) - sdf(p-h.xyy),
                           sdf(p+h.yxy) - sdf(p-h.yxy),
                           sdf(p+h.yyx) - sdf(p-h.yyx) ) );
}

float fresnel(vec3 ray, vec3 normal, float ratio){
    return pow(1. + dot(ray, normal), 3.);
}

void main(){

  vec2 uv =  gl_FragCoord.xy/u_resolution.xy;
  // vec3 displacement = texture2D(audioData, uv).rgb;
  vec3 displacement = texture2D(audioData, vec2(uv.x/2., uv.y)).rgb;
  // dispalcement = 
  // vec3 displacement = texture2D(audioData, vec2(uv.x/2., uv.y)).rgb;
    // vec2 uv =  (-u_resolution.xy + 2.0 * gl_FragCoord.xy)/u_resolution.y;
    vec2 translate = vec2(-0.5, -0.5);
    uv+=translate;
    vec3 col = vec3(0.);
    vec3 camPos = vec3(0., 0., 2.);
    vec3 ray = normalize(vec3(uv, -1.));
    float tMax = 5.;
    float gridLineWidth = 0.05; 
    float divisor = 30.;
    vec2 Coord = uv;

    float dist= length(uv);
    vec3 bg = mix(vec3(0.), vec3(0.3), dist);
    float grid = min(
        smoothstep(0.1, 0.25, abs(sin(uv.x * divisor))),
        smoothstep(0.1, 0.25, abs(sin(uv.y * divisor)))
    );

    float Speed = .01; 
    float gridX =       smoothstep(gridLineWidth, 0., abs(sin((uv.x+Speed*u_time) * divisor )));
    float gridX2 =       smoothstep(gridLineWidth, 0., abs(sin((uv.x+Speed*u_time) * divisor*2. )));
    col += gridX;
    col += gridX2;
    
    vec3 rayPos = camPos;
    float t = 0.;

    for(int i = 0; i < 256; i++){
        vec3 pos = camPos + t*ray;
        float h = sdf(pos);
        if(h<0.001 || t>tMax) break;
        t+=h;
    }



    if (t<tMax){
        vec3 pos = camPos + t*ray;
        col = vec3(1.);
        vec3 normal = calcNormal(pos);
        col = normal;
        float diff = dot(vec3(1.), normal);
        vec2 matcapUV = matcap(ray, normal);
        col = vec3(diff);
        col = vec3(matcapUV, 0.);
        col = texture2D(u_image0, matcapUV).rgb;
        vec3 f = vec3(fresnel(ray, normal, 3.));
        col = mix(col, bg, f);
    }
    // vec4 buf = texture2D(u_buffer0, uv-translate);
    // vec3 grad = texture2D(u_texture_5,uv/2.).rgb;

    vec2 uv2 = gl_FragCoord.xy/u_resolution.xy;
    col = texture2D(u_image1, uv).rgb;

    // col = displacement;
        // col = vec3(uv2.x);
    gl_FragColor = vec4(col, 1.0);
    // gl_FragColor= vec4(1.);

}



`;

export default audioFragShader;

// const audioFragShader = /*glsl*/ `
// precision mediump float;
// uniform vec2 u_resolution;
// uniform sampler2D audioData;
// uniform sampler2D u_image0;
// uniform sampler2D u_image1;
// uniform float u_time;

// vec2 matcap(vec3 eye, vec3 normal) {
//   vec3 reflected = reflect(eye, normal);
//   float m = 2.8284271247461903 * sqrt( reflected.z+1.0 );
//   return reflected.xy / m + 0.5;
// }

// float smin( float a, float b, float k )
// {
//     float res = exp2( -k*a ) + exp2( -k*b );
//     return -log2( res )/k;
// }

// float sdSphere(vec3 p, float r){
//     vec3 newP = vec3(sin(p.x), p.y, p.z);
//     return length(p)-r;
// }

// float sdf(vec3 p){
//     float sphere =  sdSphere(p, 0.5);
//     return sphere;
// }

// vec3 calcNormal( in vec3 p ) // for function f(p)
// {
//     const float eps = 0.0001; // or some other value
//     const vec2 h = vec2(eps,0);
//     return normalize( vec3(sdf(p+h.xyy) - sdf(p-h.xyy),
//                           sdf(p+h.yxy) - sdf(p-h.yxy),
//                           sdf(p+h.yyx) - sdf(p-h.yyx) ) );
// }

// void main(){
//     vec2 p =  (-u_resolution.xy + 2.0 * gl_FragCoord.xy)/u_resolution.y;
//     vec2 translate = vec2(-0.5, -0.5);
//     vec3 col = vec3(0.);
//     vec3 camPos = vec3(0., 0., 2.);
//     vec3 ray = normalize(vec3(p, -1.));
//     vec3 dataCol = texture2D(audioData, vec2(p.x, 0)).rgb;
//     float tMax = 5.;

//     vec3 rayPos = camPos;
//     float t = 0.;
//     for(int i = 0; i < 256; i++){
//         vec3 pos = camPos + t*ray;
//         float h = sdf(pos);
//         if(h<0.001 || t>tMax) break;
//         t+=h;
//     }
//     if (t<tMax){
//         vec3 pos = camPos + t*ray;
//         col = vec3(1.);
//         vec3 normal = calcNormal(pos);
//         col = normal;
//         float diff = dot(vec3(1.), normal);
//         vec2 matcapUV = matcap(ray, normal);
//         col = normal;
//         col = texture2D(u_image0, matcapUV).rgb;
//     }
//     gl_FragColor = vec4(col, 1.0);
// }

// `;

// export default audioFragShader;
