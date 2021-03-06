import IGeometry from "./Geometry";

export default class TestGeometry implements IGeometry {
    public id: number;
    public vao: WebGLVertexArrayObject|null;
    public vertexSize = 3; // Bad name, but represents the number of floats used per vertex
    public vertexCount = 6*3; // 6 sides, each with 4 points
    public vertices = [
        // left column
          0,   0,  0,
         30,   0,  0,
          0, 150,  0,
          0, 150,  0,
         30,   0,  0,
         30, 150,  0,

        // top rung
         30,   0,  0,
        100,   0,  0,
         30,  30,  0,
         30,  30,  0,
        100,   0,  0,
        100,  30,  0,

        // middle rung
         30,  60,  0,
         67,  60,  0,
         30,  90,  0,
         30,  90,  0,
         67,  60,  0,
         67,  90,  0];

         constructor(id: number, vao:WebGLVertexArrayObject|null) {
            this.vao = vao;
        }
 }