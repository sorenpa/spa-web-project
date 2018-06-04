import { vec3, vec4 } from "gl-matrix";

export enum ComponentType{
    VISIBLE,
    TRANSFORM,
    MOVABLE,
    PLAYER,
}

export interface IComponent {
    componentId: string,
    componentType: ComponentType,
}

// TODO split into Geometry/Material?
export interface IVisible extends IComponent {
    // General
    positionBufffer: WebGLBuffer|null;

    // Geometry
    modelId: string,

    // Material
    color: vec4,
    textureId: string,
    shaders: {
        vertexShaderId:string,
        fragmentShaderId:string,
    }
}

export interface ITransform extends IComponent {
    position: vec3,
    direction: vec3,
    scale: vec3,
}

export interface IMovable extends IComponent {
    acceleration: vec3,
    velocity: vec3,
    maxSpeed: number;
}

export interface IPlayer extends IComponent {
    playerName:string,
}