export enum SceneNodeType {
    UNDEFINED = 0,
    LIGHT,
    CAMERA,
    MODEL,
    MESH,
}

export default abstract class SceneNode {
    protected nodeType: SceneNodeType;
    protected parent: SceneNode;
    protected children: SceneNode[] = new Array<SceneNode>();

    constructor(nodeType:SceneNodeType){
        this.nodeType = nodeType;
    }

    public getType() : SceneNodeType {
        return this.nodeType;
    }

    public getParent() :SceneNode {
        return this.parent;
    }

    public getChildren(): SceneNode[] {
        return this.children;
    }
}