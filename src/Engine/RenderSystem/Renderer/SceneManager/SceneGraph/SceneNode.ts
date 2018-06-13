import { IRenderEntityBase } from "../..";

export enum SceneNodeType {
    UNDEFINED = 0,
    ROOT,
    LIGHT,
    CAMERA,
    MODEL,
    MESH,
}

export default abstract class SceneNode {
    protected entity: IRenderEntityBase;
    protected nodeType: SceneNodeType;
    protected parent: SceneNode|null;
    protected children: SceneNode[] = new Array<SceneNode>();

    protected constructor(entity: IRenderEntityBase, nodeType:SceneNodeType=SceneNodeType.UNDEFINED, parent:SceneNode|null=null, children:SceneNode[]=[]){
        this.entity = entity;
        this.nodeType = nodeType;
        this.children = children;
        this.parent = parent;
    }

    public insertNode(node:SceneNode, parentEntityId:number):void {
        if(parentEntityId === this.entity.entityId){
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

    public getEntity(): IRenderEntityBase {
        return this.entity;
    }
}
