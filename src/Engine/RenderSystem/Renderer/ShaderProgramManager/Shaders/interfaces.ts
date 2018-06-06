export enum ShaderType {
    VERTEX,
    FRAGMENT
}

export interface IShader {
    shaderId: number,
    header: string,
    shaderType: ShaderType,
    attributes: IShaderVariable[],
    uniforms: IShaderVariable[],
    varyings: IShaderVariable[],
    source: string,
}

export interface IShaderVariable{
    name: string,
    type: string,
}

export interface IShaderProgram {
    progamId: number,
    fragmentShaderId: number,
    vertexShaderId: number,
    program: WebGLProgram|null,
    attributeLocations: Map<string,number>,
    uniformLocations: Map<string,WebGLUniformLocation|null>,
}

export interface IShaderPair {
    vertexShaderId: number,
    fragmentShaderId: number, 
}