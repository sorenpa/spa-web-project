import { IVector3D } from "../../Math";

export enum ComponentType{
    VISIBLE,
    TRANSFORM,
    MOVABLE,
    PLAYER,
}

export interface IComponent {
    componentId: string,
    componentType: ComponentType,
    // entityId?
}

// TODO split into Geometry/Material?
export interface IVisible extends IComponent {
    modelId: string,
    textureId: string,
    color: string,
    shaders: {
        vertexShaderId:string,
        fragmentShaderId:string,
    }

}

export interface ITransform extends IComponent {
    position: IVector3D,
    direction: IVector3D,
    scale: IVector3D,
}

export interface IMovable extends IComponent {
    acceleration: IVector3D,
    velocity: IVector3D,
    maxSpeed: number;
}

export interface IPlayer extends IComponent {
    playerName:string,
}