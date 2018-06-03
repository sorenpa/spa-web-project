import { IShader, ShaderType } from "./interfaces";

  export const vertexShaderBase:IShader = {
    header: '#version 300 es',
    attributes: [
      {name:'a_VertexPosition', type: 'vec4'}
    ],
    uniforms: [
      {name:'u_ProjectionMatrix', type: 'mat4'}
    ],
    varyings:[],
    shaderId: 'VertexShaderBase',
    shaderType: ShaderType.VERTEX,
    source: `
    void main() {
      gl_Position = u_ProjectionMatrix * a_VertexPosition;
    }`
  }