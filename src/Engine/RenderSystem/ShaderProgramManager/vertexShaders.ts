export const vertexShaderBase:string = `#version 300 es
    in vec4 a_VertexPosition;

    uniform mat4 u_ProjectionMatrix;
   
    void main() {
      gl_Position = u_ProjectionMatrix * a_VertexPosition;
    }
  `;