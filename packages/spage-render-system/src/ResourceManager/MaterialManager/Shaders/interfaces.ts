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
    program: WebGLProgram|null,
    attributeLocations: Map<string,number>,
    uniformLocations: Map<string,WebGLUniformLocation|null>,
}

