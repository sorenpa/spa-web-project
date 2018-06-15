import { fragmentShaderBase, IShader, IShaderProgram, ShaderType, vertexShaderBase } from "./Shaders";

export interface IProgramSource {
    fragmentSource: IShader,
    vertexSource: IShader
}

export class ShaderLibrary{
    private materialSources: Map<number, IProgramSource>

    constructor() {
        this.materialSources = new Map<number, IProgramSource>();

        this.materialSources.set(1,{fragmentSource: fragmentShaderBase, vertexSource: vertexShaderBase});
    }

    public initShaderProgram(gl: WebGLRenderingContext, materialId:number): IShaderProgram|null {

        const materialSources = this. materialSources.get(materialId);

        if(materialSources === undefined){ return null; }

        const { vertexSource, fragmentSource } = materialSources;

        const vertexShaderSource = this.assembleShader(vertexSource);
        const fragmentShaderSource = this.assembleShader(fragmentSource);
        
        const vertexShader: WebGLShader|null = this.loadShader(gl, ShaderType.VERTEX, vertexShaderSource);
        const fragmentShader: WebGLShader|null = this.loadShader(gl, ShaderType.FRAGMENT, fragmentShaderSource);

        const shaderProgram: WebGLProgram|null = gl.createProgram();

        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
            return null;
        }

        const attributeLocations: Map<string,number> = new Map<string,number>();
        const uniformLocations: Map<string,WebGLUniformLocation|null> = new Map<string,number>();

        // TODO: This means that the same variable name cannot be used on the shaders!
        vertexSource.attributes.concat(fragmentSource.attributes).forEach(attribute => {
            attributeLocations.set(attribute.name, gl.getAttribLocation(shaderProgram, attribute.name));
        })

        vertexSource.uniforms.concat(fragmentSource.uniforms).forEach(uniform => {
            uniformLocations.set(uniform.name, gl.getUniformLocation(shaderProgram, uniform.name));
        })

        const program: IShaderProgram = {
            attributeLocations,
            progamId: materialId,
            program: shaderProgram,
            uniformLocations,
        }

        return program;
    }

    private loadShader(gl: WebGLRenderingContext, type: ShaderType, source: string): WebGLShader | null {

        let shader: WebGLShader | null = null;

        switch (type) {
            case ShaderType.VERTEX: {
                shader = gl.createShader(gl.VERTEX_SHADER);
                break;
            };
            case ShaderType.FRAGMENT: { 
                shader = gl.createShader(gl.FRAGMENT_SHADER);
                break;
            };
        }

        if (shader === null) {
            alert('An error occurred while creating shaders: ' + {
                source,
                type,
            });
            gl.deleteShader(shader);
            return null
        }

        gl.shaderSource(shader, source);
        gl.compileShader(shader)

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    private assembleShader(shader:IShader): string{
        let result: string = shader.header + '\n';

        // Add attriubutes
        shader.attributes.forEach(attribute => {
            result += 'in ' + attribute.type + ' ' + attribute.name + ";\n";
        });

        // Add uniforms
        shader.uniforms.forEach(uniform => {
            result += 'uniform ' + uniform.type + ' ' + uniform.name + ";\n";
        });

        // Add varyings
        shader.varyings.forEach(varying => {
            result += 'varying ' + varying.type + ' ' + varying.name + ";\n";
        });

        // Add main shader code
        result += shader.source

        console.log(result);

        return result;
    }

}