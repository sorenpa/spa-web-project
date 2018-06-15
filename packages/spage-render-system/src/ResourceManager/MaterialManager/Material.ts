import { IShaderProgram } from "./Shaders";

export default interface IMaterial {
    id: number;
    shaderProgram: IShaderProgram,
}