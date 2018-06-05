// Should this contain the vertice count, stride, GL_TRINAGLE, GL_STATIC_DRAW etc?
export abstract class RenderModel{
    
    public vao: WebGLVertexArrayObject|null;
    public vertexSize: number;
    public vertexCount: number;
    public vertices: number[];

    constructor(vao:WebGLVertexArrayObject|null) {
        this.vao = vao;
    }

    
}