import { IShaderProgram } from "./Shaders/interfaces";
import { ShaderLibrary } from "./ShaderLibrary";

interface IShaderPair {
    vertexShaderId: string,
    fragmentShaderId: string,        
}

export default class ShaderProgramManager {

    
    private shaderLibrary: ShaderLibrary;
    private shaderPrograms: Map<IShaderPair,IShaderProgram>;

    constructor(){
        this.shaderLibrary = new ShaderLibrary();
        this.shaderPrograms = new Map<IShaderPair,IShaderProgram>();
    }

    public registerShader(gl:WebGL2RenderingContext, vertexShaderId:string, fragmentShaderId: string) {

        const shaderPair:IShaderPair = {vertexShaderId,fragmentShaderId};

        if(this.shaderPrograms.has(shaderPair)) { return; }

        const program: IShaderProgram|null = this.shaderLibrary.initShaderProgram(gl, vertexShaderId, fragmentShaderId);

        if(program === null) { return; }

        this.shaderPrograms.set(shaderPair, program);
    }

    public getShader(vertexShaderId:string, fragmentShaderId:string) : IShaderProgram|undefined {
        return this.shaderPrograms.get({vertexShaderId,fragmentShaderId});
    }
}