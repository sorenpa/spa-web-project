import Material from "./Material";
import { ShaderLibrary } from "./ShaderLibrary";
import { IShaderPair, IShaderProgram } from "./Shaders";



export default class ShaderProgramManager {

    
    private shaderLibrary: ShaderLibrary;

    private materials: Map<number,Material>;

    private idCounter: number = 0;

    constructor(){
        this.shaderLibrary = new ShaderLibrary();

        this.materials = new Map<number,Material>();
    }

    public registerShader(gl:WebGL2RenderingContext, shaderPair:IShaderPair): number {

        const materialId: number = this.idCounter++;

        if(this.materials.has(materialId)) { return materialId; }

        const program: IShaderProgram|null = this.shaderLibrary.initShaderProgram(gl, shaderPair.vertexShaderId,shaderPair.fragmentShaderId);

        if(program === null) { return 0; }

        const material: Material = {
            shaderProgram: program
        }

        this.materials.set(materialId, material );

        return materialId;
    }

    public getShader(programId:number) : Material|undefined {
        return this.materials.get(programId);
    }
}