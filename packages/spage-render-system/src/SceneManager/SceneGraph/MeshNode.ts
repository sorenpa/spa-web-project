import { IRenderEntityBase } from "../../RenderEntity";
import { IMaterial } from "../../ResourceManager/";
import ModelNode from "./ModelNode";
import SceneNode, { SceneNodeType } from "./SceneNode";


export default class MeshNode extends SceneNode{

    private modelNode: ModelNode;

    private vertBufStartIndex: number;
    private vertBufEndIndex: number;

    private material: IMaterial;

    constructor(entity:IRenderEntityBase, parent:SceneNode, children:SceneNode[], modelNode: ModelNode, vertStart: number, vertEnd: number, material:IMaterial) {
        super(entity, SceneNodeType.MESH, parent, children);
        this.modelNode = modelNode;
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

    public getModelNode(): ModelNode {
        return this.modelNode;
    }
    
}