import IGameObjectRenderData from './interfaces';
import RenderObject from './RenderObject';


export default class Rectangle extends RenderObject{

    constructor(gameObjectId:string, renderData:IGameObjectRenderData){
        
        super(gameObjectId, renderData);
    }

    

}