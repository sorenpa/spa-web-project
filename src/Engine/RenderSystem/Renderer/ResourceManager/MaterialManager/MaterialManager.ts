import IMaterial from "./Material";
import { ShaderLibrary } from "./ShaderLibrary";
import { IShaderProgram } from "./Shaders";



export default class ShaderProgramManager {

    
    private shaderLibrary: ShaderLibrary;

    private materials: Map<number,IMaterial>;

    constructor(){
        this.shaderLibrary = new ShaderLibrary();

        this.materials = new Map<number,IMaterial>();
    }

    public registerMaterial(gl:WebGL2RenderingContext, materialId:number): IMaterial|undefined {

        if(this.materials.has(materialId)) { return this.getMaterial(materialId); }

        const program: IShaderProgram|null = this.shaderLibrary.initShaderProgram(gl, materialId);

        if(program === null) { return undefined; }

        const material: IMaterial = {
            id: materialId,
            shaderProgram: program
        }

        this.materials.set(materialId, material );

        return material;
    }

    public getMaterial(materialId:number) : IMaterial|undefined {
        return this.materials.get(materialId);
    }
}