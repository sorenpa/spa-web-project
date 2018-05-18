import { IVector3D } from "../Math/interfaces";
import GameObject from "./GameObject";

export default abstract class RenderObject extends GameObject{

    public renderModelId: string;

    constructor(position: IVector3D, renderModelId: string){
        super(position);
        this.renderModelId = renderModelId;
    }


}