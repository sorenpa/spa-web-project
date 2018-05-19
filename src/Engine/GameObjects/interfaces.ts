import { IVector3D } from "../Math/interfaces";

export default interface IGameObjectRenderData
{
    translation: IVector3D,
    rotation: IVector3D,
    scale: IVector3D,
    renderModelId: string,
    renderTextureId: string,
    color: string,
}