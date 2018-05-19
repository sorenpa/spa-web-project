import GameObject from "./GameObject";
import IGameObjectRenderData from "./interfaces";

export default abstract class RenderObject extends GameObject{

    public renderData: IGameObjectRenderData

    constructor(gmaeObjectId:string, renderData: IGameObjectRenderData){
        super(gmaeObjectId, renderData.translation);
        this.renderData = renderData;
    }
}