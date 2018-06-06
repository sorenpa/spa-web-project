import { IShader, ShaderType } from "./interfaces";

  export const vertexShaderBase:IShader = {
    attributes: [
      {name:'a_VertexPosition', type: 'vec4'}
    ],
    header: '#version 300 es',
    shaderId: 1,
    shaderType: ShaderType.VERTEX,
    source: `void main() {
      gl_Position = u_ProjectionMatrix * a_VertexPosition;
    }`,
    uniforms: [
      {name:'u_ProjectionMatrix', type: 'mat4'}
    ],
    varyings:[],
  }