import { IMaterial } from "../../ResourceManager/";
import SceneNode, { SceneNodeType } from "./SceneNode";

 
export default class MeshNode extends SceneNode{

    private vertBufStartIndex: number;
    private vertBufEndIndex: number;

    private material: IMaterial;

    constructor(vertStart: number, vertEnd: number, material:IMaterial) {
        super(SceneNodeType.MESH);

        this.vertBufStartIndex = vertStart;
        this.vertBufEndIndex = vertEnd;
        this.material = material;
    }

    public getVertBufStartIndex():number{
        return this. vertBufStartIndex;
    }

    public getVertBufEndIndex():number{
        return this. vertBufEndIndex;
    }

    public getMaterial():IMaterial {
        return this.material;
    }
}