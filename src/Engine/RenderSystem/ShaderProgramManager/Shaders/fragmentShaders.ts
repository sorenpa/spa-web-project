import { IShader, ShaderType } from "../Shader";

// export const fragmentShaderBase:string = `#version 300 es
// precision mediump float;

// uniform  vec4 u_color;

// out vec4 outColor;

// void main() {
//   outColor = u_color;
// }
// `;

export const fragmentShaderBase:IShader = {
  header: `#version 300 es
  precision mediump float;`,
  attributes: [],
  uniforms: [
    {name:'u_color', type: 'vec4'}
  ],
  varyings:[],
  shaderId: 'FragmentShaderBase',
  shaderType: ShaderType.FRAGMENT,
  source: `

  out vec4 outColor;

  void main() {
    outColor = u_color;
  }`
}