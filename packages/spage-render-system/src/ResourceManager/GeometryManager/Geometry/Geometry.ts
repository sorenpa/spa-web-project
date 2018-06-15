// Should this contain the vertice count, stride, GL_TRINAGLE, GL_STATIC_DRAW etc?
export default interface IGeometry{
    id: number;    
    vao: WebGLVertexArrayObject|null;
    vertexSize: number;
    vertexCount: number;
    vertices: number[];
}