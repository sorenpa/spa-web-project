import { IVector3D } from "../../Shared/Math";

export enum ComponentType{
    VISIBLE,
    PHYSICS,
    MOVABLE,
}

export interface IComponent
{
    componentId: string,
    componentType: ComponentType,
    // EntityId: string, ???
}

export interface IVisible extends IComponent
{
    modelId: string,
    textureId: string,
    color: string
}

export interface IPhysics extends IComponent{
    position: IVector3D,
    direction: IVector3D,
    scale: IVector3D,
}

export interface IMovable extends IComponent{
    acceleration: IVector3D,
    speed: IVector3D,
}