export interface IShaderProgramInfo {
    program: WebGLProgram|null,
    attribLocations: {
        vertexPosition: number
    },
    uniformLocations:{
        color: WebGLUniformLocation|null
        modelViewMatrix: WebGLUniformLocation|null,
        projectionMatrix: WebGLUniformLocation|null
        
        
    }

}