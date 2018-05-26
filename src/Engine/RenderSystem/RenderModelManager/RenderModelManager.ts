import { ITransform, IVisible } from '../../ComponentSystem';
import {IRenderModel, RectangleModel } from './Models'




export default class RenderModelService{

    private ModelMap: Map<string,IRenderModel>;
    constructor(){
        this.ModelMap = new Map<string,IRenderModel>();
        this.ModelMap.set('rectangle', new RectangleModel());
        
    }

    public GetModel(id:string):IRenderModel|undefined{
        return this.ModelMap.get(id);
    }

    public drawModel(context:CanvasRenderingContext2D, visibleCompoenent: IVisible, transformComponent: ITransform){
        const { modelId, color} = visibleCompoenent;
        const { position, scale } = transformComponent;

        const model: IRenderModel|undefined = this.ModelMap.get(modelId);
        if(model !== undefined){
            model.renderFunction(context, position, scale, color)
        }
    }
}