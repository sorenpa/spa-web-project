export enum SceneNodeType {
    UNDEFINED = 0,
    ROOT,
    LIGHT,
    CAMERA,
    MODEL,
    MESH,
}

export default abstract class SceneNode {
    protected entityId: number;
    protected nodeType: SceneNodeType;
    protected parent: SceneNode|null;
    protected children: SceneNode[] = new Array<SceneNode>();

    protected constructor(entityId:number, nodeType:SceneNodeType=SceneNodeType.UNDEFINED, parent:SceneNode|null=null, children:SceneNode[]=[]){
        this.entityId = entityId;
        this.nodeType = nodeType;
        this.children = children;
        this.parent = parent;
    }

    public insertNode(node:SceneNode, parentEntityId:number):void {
        if(parentEntityId === this.entityId){
            this.addChild(node);
            return;
        }
        else if(this.children.length === 0){
            return;
        }

        this.children.forEach(child => {
            child.insertNode(node, parentEntityId);
        });
        
    }

    public addChild(child:SceneNode):void {
        this.children.push(child);
    }

    public getType() : SceneNodeType {
        return this.nodeType;
    }

    public getParent() :SceneNode|null {
        return this.parent;
    }

    public getChildren(): SceneNode[] {
        return this.children;
    }

    public getId():number {
        return this.entityId;
    }
}
