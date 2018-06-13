import { IModelEntity } from "../../RenderEntity";
import { IGeometry } from "../../ResourceManager";
import MeshNode from "./MeshNode";
import SceneNode, { SceneNodeType } from "./SceneNode";


export default class ModelNode extends SceneNode {
    private meshNodes: MeshNode[];

    constructor(entity:IModelEntity, parent:SceneNode|null, children:SceneNode[]=[]) {
        super(entity, SceneNodeType.UNDEFINED, parent, children)
        // TODO will this pass by reference ?
        this.meshNodes = children.filter(c => c.getType() === SceneNodeType.MESH) as MeshNode[]; 
    }
    
    public getGeometry(): IGeometry {
        return (this.entity as IModelEntity).geometry;
    }

    public getMeshNodes(): MeshNode[] {
        return this.meshNodes;
    }

}