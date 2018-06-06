import { IShader, ShaderType } from "./interfaces";

// export const fragmentShaderBase:string = `#version 300 es
// precision mediump float;

// uniform  vec4 u_color;

// out vec4 outColor;

// void main() {
//   outColor = u_color;
// }
// `;

export const fragmentShaderBase:IShader = {
  attributes: [],
  header: `#version 300 es
  precision mediump float;`,
  shaderId: 'FragmentShaderBase',
  shaderType: ShaderType.FRAGMENT,
  source: `out vec4 outColor;

  void main() {
    outColor = u_Color;
  }`,
  uniforms: [
    {name:'u_Color', type: 'vec4'}
  ],
  varyings:[],
}