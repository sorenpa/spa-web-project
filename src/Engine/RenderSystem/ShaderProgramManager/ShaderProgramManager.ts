import { ShaderLibrary } from "./ShaderLibrary";
import { IShaderPair, IShaderProgram } from "./Shaders/interfaces";


export default class ShaderProgramManager {

    
    private shaderLibrary: ShaderLibrary;

    private shaderPrograms: Map<string,IShaderProgram>;

    constructor(){
        this.shaderLibrary = new ShaderLibrary();

        this.shaderPrograms = new Map<string,IShaderProgram>();
    }

    public registerShader(gl:WebGL2RenderingContext, shaderPair:IShaderPair): string {

        const programId: string = shaderPair.vertexShaderId+shaderPair.fragmentShaderId;

        if(this.shaderPrograms.has(programId)) { return programId; }

        const program: IShaderProgram|null = this.shaderLibrary.initShaderProgram(gl, shaderPair.vertexShaderId,shaderPair.fragmentShaderId);

        if(program === null) { return ''; }

        this.shaderPrograms.set(programId, program);

        return programId;
    }

    public getShader(programId:string) : IShaderProgram|undefined {
        return this.shaderPrograms.get(programId);
    }
}