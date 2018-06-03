import { IShader, IShaderProgram, ShaderType } from "./Shaders/interfaces";
import { vertexShaderBase } from "./Shaders/vertexShaders";
import { fragmentShaderBase } from "./Shaders/fragmentShaders";


export class ShaderLibrary{
    private vertexShaders: Map<string, IShader>
    private fragmentShaders: Map<string, IShader>

    constructor() {
        this.vertexShaders = new Map<string, IShader>();
        this.fragmentShaders = new Map<string, IShader>();

        this.vertexShaders.set('vertexBase', vertexShaderBase);
        this.fragmentShaders.set('fragmentBase', fragmentShaderBase);
    }

    public initShaderProgram(gl: WebGLRenderingContext, vertexShaderId: string, fragmentShaderId: string): IShaderProgram|null {
        
        const vertexShaderData: IShader|undefined = this.vertexShaders.get(vertexShaderId);
        const fragmentShaderData: IShader|undefined = this.fragmentShaders.get(fragmentShaderId);

        if(vertexShaderData === undefined || fragmentShaderData === undefined) { return null; }

        const vertexShaderSource = this.assembleShader(vertexShaderData);
        const fragmentShaderSource = this.assembleShader(fragmentShaderData);
        
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
        vertexShaderData.attributes.concat(fragmentShaderData.attributes).forEach(attribute => {
            attributeLocations.set(attribute.name, gl.getAttribLocation(shaderProgram, attribute.name));
        })

        vertexShaderData.uniforms.concat(fragmentShaderData.uniforms).forEach(uniform => {
            uniformLocations.set(uniform.name, gl.getUniformLocation(shaderProgram, uniform.name));
        })

        const program: IShaderProgram = {
            attributeLocations,
            uniformLocations,
            fragmentShaderId,
            vertexShaderId,
            program: shaderProgram,
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

        //Add attriubutes
        shader.attributes.forEach(attribute => {
            result += 'in ' + attribute.type + ' ' + attribute.name + ";\n";
        });

        result += '\n';

        //Add uniforms
        shader.uniforms.forEach(uniform => {
            result += 'uniform ' + uniform.type + ' ' + uniform.name + ";\n";
        });

        result += '\n';

        //Add varyings
        shader.varyings.forEach(varying => {
            result += 'varying ' + varying.type + ' ' + varying.name + ";\n";
        });

        result += '\n';

        //add main shader code
        result += shader.source

        return result;
    }

}