import { vec3 } from "gl-matrix";
import { IRenderEntityBase, RenderEntityType } from "../../RenderEntity";
import SceneNode, { SceneNodeType } from "./SceneNode";

const rootEntity: IRenderEntityBase = {
    direction: vec3.create(),
    entityId: -1,
    position: vec3.create(),
    renderType: RenderEntityType.MODEL,
    scale: vec3.create(),
    

}

export default class RootNode extends SceneNode{

    constructor(children:SceneNode[]=[]) {
        super(rootEntity, SceneNodeType.ROOT, null, children)
    }
}