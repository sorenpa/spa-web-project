import { vec3, vec4 } from "gl-matrix";

export default interface IRenderEntity {
    entityId: number
    positionBufffer: WebGLBuffer|null;
    position: vec3,
    direction: vec3,
    scale: vec3,
    geometryId: number,
    color: vec4,
    materialId: number,
}