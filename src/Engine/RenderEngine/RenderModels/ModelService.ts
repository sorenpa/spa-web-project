import IRenderModel from './IRenderModel'
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
}