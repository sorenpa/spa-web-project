import { vec3, vec4 } from "gl-matrix";
import { IGeometry, IMaterial } from "./ResourceManager";

export enum RenderEntityType
{
    UNDEFINED = 0,
    MODEL,
    MESH,
    CAMERA,
    LIGHT,
}

export interface IRenderEntityBase { 
    entityId: number
    renderType: RenderEntityType,
    position: vec3,
    direction: vec3,
    scale: vec3,
}

export interface IModelEntity extends IRenderEntityBase {
    positionBuffer: WebGLBuffer;
    geometry: IGeometry,
    material: IMaterial,
    color: vec4,
}