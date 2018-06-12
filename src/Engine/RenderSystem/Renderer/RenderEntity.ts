import { vec3, vec4 } from "gl-matrix";
import { IGeometry, IMaterial } from "./ResourceManager";

// This interface is only used for transferring base fields of an ECS
// Entity to the regiserter function in renderer.ts
export interface IRenderEntityBase { 
    entityId: number
    position: vec3,
    direction: vec3,
    scale: vec3,
    color: vec4,
}

export default interface IRenderEntity extends IRenderEntityBase {
    positionBuffer: WebGLBuffer;
    geometry: IGeometry,
    material: IMaterial,
}