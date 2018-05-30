import { IRenderModel } from ".";


export default class TestModel implements IRenderModel {

    public vertexSize = 2; // Bad name, but represents the number of floats used per vertex
    public vertexCount = 6; // 6 sides, each with 4 points
    public vertices = [
        10, 20,
        80, 20,
        10, 30,
        10, 30,
        80, 20,
        80, 30,
      ];
 }