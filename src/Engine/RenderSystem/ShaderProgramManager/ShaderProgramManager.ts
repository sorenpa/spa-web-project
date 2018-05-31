import { fragmentShaderBase } from './fragmentShaders'
import { IShaderProgramInfo } from './interfaces';
import { vertexShaderBase } from './vertexShaders'


export const enum ShaderType {
    VERTEX,
    FRAGMENT,
}

export default class ShaderProgramManager {



    private vertexShaders: Map<string, any>
    private fragmentShaders: Map<string, any>

    constructor() {
        this.vertexShaders = new Map<string, any>();
        this.fragmentShaders = new Map<string, any>();

        this.vertexShaders.set('vertexBase', vertexShaderBase);
        this.fragmentShaders.set('fragmentBase', fragmentShaderBase);
    }

    public initShaderProgram(gl: WebGLRenderingContext, vertexShaderId: string, fragmentShaderId: string): IShaderProgramInfo|null {
        const vertexShader: WebGLShader|null = this.loadShader(gl, ShaderType.VERTEX, vertexShaderId);
        const fragmentShader: WebGLShader|null = this.loadShader(gl, ShaderType.FRAGMENT, fragmentShaderId);

        const shaderProgram: WebGLProgram|null = gl.createProgram();

        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
            return null;
        }

        return {
            attribLocations: {
                vertexPosition: gl.getAttribLocation(shaderProgram, 'a_VertexPosition'),
            },
            program: shaderProgram,
            uniformLocations:{
                color: gl.getUniformLocation(shaderProgram, 'u_color'),
                modelViewMatrix: gl.getUniformLocation(shaderProgram, 'u_ModelViewMatrix'),
                projectionMatrix: gl.getUniformLocation(shaderProgram, 'u_ProjectionMatrix'),
                
            }
        };
    }

    private loadShader(gl: WebGLRenderingContext, type: ShaderType, id: string): WebGLShader | null {

        let shader: WebGLShader | null = null;

        let shaderSource: string | undefined;
        switch (type) {
            case ShaderType.VERTEX: {
                shader = gl.createShader(gl.VERTEX_SHADER);
                shaderSource = this.vertexShaders.get(id) 
                break;
            };
            case ShaderType.FRAGMENT: { 
                shader = gl.createShader(gl.FRAGMENT_SHADER);
                shaderSource = this.fragmentShaders.get(id) 
                break;
            };
        }

        if (shader === null || shaderSource === undefined) {
            alert('An error occurred while creating shaders: ' + {
                id,
                shaderSource: shaderSource === undefined ? 'undefined' : 'defined',
                type,
            });
            gl.deleteShader(shader);
            return null
        }

        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader)

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }

        return shader;
    }
}