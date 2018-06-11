import { Geometry } from "../../ResourceManager";
import MeshNode from "./MeshNode";
import SceneNode, { SceneNodeType } from "./SceneNode";

export default class ModelNode extends SceneNode {

    private geometry: Geometry
    private meshNodes: MeshNode[];

    constructor() {
        super(SceneNodeType.MODEL);
        this.meshNodes = new Array<MeshNode>();
    }

    public getGeometry(): Geometry {
        return this.geometry;
    }

    public getMeshNodes(): MeshNode[] {
        return this.meshNodes;
    }
}