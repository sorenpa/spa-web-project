import { IVector3D } from "../../../Shared/Math";
import { IRenderModel } from "./interfaces";

export default class RectangleModel implements IRenderModel{

    private height: number = 25;
    private width: number = 25;

    public renderFunction(context: CanvasRenderingContext2D, translate:IVector3D , scale: IVector3D, texture: string){
        const height = this.height*scale.x
        const width = this.width*scale.y
        
        context.fillStyle = texture; // Temporarily the color is = to texture
        context.fillRect(translate.x,translate.y,width,height)
    }

}