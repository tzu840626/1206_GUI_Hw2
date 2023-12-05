// Author: @patriciogv
// Title: CellularNoise

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2( vec2 p ) {
    return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}
// Part 2 - Step 1
// from here
uniform float u_xBrickAmount;
uniform float u_yBrickAmount;
// to here
uniform sampler2D u_texBase;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 brickAmount = vec2(u_xBrickAmount, u_yBrickAmount);
    vec2 stAdjustedByBrickAmount = st * brickAmount;
    vec2 integerCoordinate = floor(stAdjustedByBrickAmount); // get the integer coords
    vec2 fractionalCoordinate = fract(stAdjustedByBrickAmount); // get the fractional coords
    vec2 mosaic = integerCoordinate / brickAmount;
    
    
    
    
    
    
    vec3 color = vec3(0.465,0.008,0.043);
    color = texture2D(u_texBase, mosaic).rgb;
    
    //st.x *= u_resolution.x/u_resolution.y;
    //vec3 color = vec3(.0);

    // Scale
    st *= 1.5;

    // Tile the space
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float m_dist = 1.;  // minimum distance

    for (int y= -9; y <= 9; y++) {
        for (int x= -9; x <= 9; x++) {
            // Neighbor place in the grid
            vec2 neighbor = vec2(float(x),float(y));

            // Random position from current + neighbor place in the grid
            vec2 point = random2(i_st + neighbor);

			// Animate the point
            point = 0.1 + 0.05*sin(u_time + 3.*point);

			// Vector between the pixel and the point
            vec2 diff = neighbor + point / f_st;

            // Distance to the point
            float dist = length(diff);

            // Keep the closer distance
            m_dist = min(m_dist, dist);
        }
    }

    // Draw the min distance (distance field)
    color += m_dist;

    // Draw cell center
    color += 0.4-step(.0, m_dist);


    // Show isolines
    //color -= step(.1,abs(sin(0.1*m_dist)))*.2;

    
    gl_FragColor = vec4(color,1.864);
}
