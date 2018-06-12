import { IGeometry } from "../../ResourceManager";
import MeshNode from "./MeshNode";
import SceneNode, { SceneNodeType } from "./SceneNode";

export default class ModelNode extends SceneNode {

    private geometry: IGeometry
    private meshNodes: MeshNode[];

    constructor(entityId:number, parent:SceneNode|null, children:SceneNode[]=[], geometry:IGeometry) {
        super(entityId, SceneNodeType.UNDEFINED, parent, children)
        // TODO will this pass by reference ?
        this.meshNodes = children.filter(c => c.getType() === SceneNodeType.MESH) as MeshNode[]; 
        this.geometry = geometry;
    }
    
    public getGeometry(): IGeometry {
        return this.geometry;
    }

    public getMeshNodes(): MeshNode[] {
        return this.meshNodes;
    }
}