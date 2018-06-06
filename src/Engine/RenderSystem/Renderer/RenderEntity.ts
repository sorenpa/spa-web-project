import { vec3, vec4 } from "gl-matrix";

export default interface IRenderEntity {
    entityId: number
    // General
    positionBufffer: WebGLBuffer|null;
    // Geometry
    modelId: number,
    // Material
    color: vec4,
    textureId: number,
    shaders: {
        vertexShaderId:number,
        fragmentShaderId:number,
    }
    position: vec3,
    direction: vec3,
    scale: vec3,
}