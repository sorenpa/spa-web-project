import { ShaderLibrary } from "./ShaderLibrary";
import { IShaderPair, IShaderProgram } from "./Shaders";


export default class ShaderProgramManager {

    
    private shaderLibrary: ShaderLibrary;

    private shaderPrograms: Map<number,IShaderProgram>;

    private idCounter: number = 0;

    constructor(){
        this.shaderLibrary = new ShaderLibrary();

        this.shaderPrograms = new Map<number,IShaderProgram>();
    }

    public registerShader(gl:WebGL2RenderingContext, shaderPair:IShaderPair): number {

        const programId: number = this.idCounter++;

        if(this.shaderPrograms.has(programId)) { return programId; }

        const program: IShaderProgram|null = this.shaderLibrary.initShaderProgram(gl, shaderPair.vertexShaderId,shaderPair.fragmentShaderId);

        if(program === null) { return 0; }

        this.shaderPrograms.set(programId, program);

        return programId;
    }

    public getShader(programId:number) : IShaderProgram|undefined {
        return this.shaderPrograms.get(programId);
    }
}