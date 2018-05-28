import { IRenderModel } from ".";


export default class CubeModel implements IRenderModel {

    public vertices: number[] = [
        1.0, 1.0,
        -1.0, 1.0,
        1.0, -1.0,
        -1.0, -1.0,
    ]
 }