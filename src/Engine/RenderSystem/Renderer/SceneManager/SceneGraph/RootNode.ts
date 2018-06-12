import SceneNode, { SceneNodeType } from "./SceneNode";

export default class RootNode extends SceneNode{
    constructor(children:SceneNode[]=[]) {
        super(-1, SceneNodeType.ROOT, null, children)
    }
}