import { IVector3D } from "../../../Math";

export interface IRenderModel{
    renderFunction : (context: CanvasRenderingContext2D, translate:IVector3D , scale: IVector3D, texture: string) => void,
}