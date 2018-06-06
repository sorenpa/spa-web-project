import { vec3, vec4 } from "gl-matrix";

export default interface IRenderEntity {
    entityId: string
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
    position: vec3,
    direction: vec3,
    scale: vec3,
}