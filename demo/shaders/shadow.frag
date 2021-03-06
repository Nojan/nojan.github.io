#version 100
precision highp float;

vec4 encodeFloat (float depth) {
  const vec4 bitShift = vec4(256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0);
  const vec4 bitMask = vec4(0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0);
  vec4 comp = fract(depth * bitShift);
  comp -= comp.xxyz * bitMask;
  return comp;
}

float decodeFloat(vec4 color) 
{
	const vec4 bitShift = vec4(1.0 / (256.0 * 256.0 * 256.0), 1.0 / (256.0 * 256.0), 1.0 / 256.0, 1.0);
	return dot(color, bitShift);
}

void main()
{
    gl_FragColor = encodeFloat(gl_FragCoord.z);
} 
