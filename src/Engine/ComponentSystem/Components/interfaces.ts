import { vec3, vec4 } from "gl-matrix";

export enum ComponentType{
    VISIBLE     = 0b1,
    TRANSFORM   = 0b10,
    MOVABLE     = 0b100,
    PLAYER      = 0b1000,
}

export interface IComponent {
    componentId: number,
    componentType: ComponentType,
}

// TODO split into Geometry/Material?
export interface IVisible extends IComponent {
    // Geometry
    modelId: number,

    // Material
    color: vec4,
    materialId: number
}

export interface ITransform extends IComponent {
    position: vec3,
    direction: vec3,
    scale: vec3,
}

export interface IMovable extends IComponent {
    acceleration: vec3,
    velocity: vec3,
    deltaVelocity: vec3
    maxSpeed: number;
}

export interface IPlayer extends IComponent {
    playerName:string,
}