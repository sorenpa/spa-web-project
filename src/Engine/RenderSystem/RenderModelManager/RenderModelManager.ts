import { IPhysics, IVisible } from '../../ComponentSystem/Components/interfaces';
import {IRenderModel} from './Models'
import RectangleModel from './Models/RectangleModel';



export default class RenderModelService{

    private ModelMap: Map<string,IRenderModel>;
    constructor(){
        this.ModelMap = new Map<string,IRenderModel>();
        this.ModelMap.set('rectangle', new RectangleModel());
        
    }

    public GetModel(id:string):IRenderModel|undefined{
        return this.ModelMap.get(id);
    }

    public drawModel(context:CanvasRenderingContext2D, visibleCompoenent: IVisible, physicsComponent: IPhysics){
        const { modelId, color} = visibleCompoenent;
        const { position, scale } = physicsComponent;

        const model: IRenderModel|undefined = this.ModelMap.get(modelId);
        if(model !== undefined){
            model.renderFunction(context, position, scale, color)
        }
    }
}