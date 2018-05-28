import { ITransform, IVisible } from '../../ComponentSystem';
import { CubeModel, IRenderModel } from './Models'




export default class RenderModelService{

    private ModelMap: Map<string,IRenderModel>;
    constructor(){
        this.ModelMap = new Map<string,IRenderModel>();
        this.ModelMap.set('cube', new CubeModel());
        
    }

    public GetModel(id:string):IRenderModel|undefined{
        return this.ModelMap.get(id);
    }

    public initBuffer(gl:WebGLRenderingContext, visibleCompoenent: IVisible, transformComponent: ITransform): WebGLBuffer|null{
        const { modelId } = visibleCompoenent;
        // const { position, scale } = transformComponent;

        const model: IRenderModel|undefined = this.ModelMap.get(modelId);
        if(model !== undefined){

            const positionBuffer = gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(model.vertices), gl.STATIC_DRAW);

            return positionBuffer;
        }

        return null;
    }
}