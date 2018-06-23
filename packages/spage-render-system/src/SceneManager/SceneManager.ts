import { log, LogEntryModule, LogEntryType } from "spage-logging-system";

import { IModelEntity, IRenderEntityBase, RenderEntityType,  } from "../RenderEntity";
import { ModelNode, RootNode, SceneNode,  } from "./SceneGraph";


export default class SceneManager {
    private sceneEntities: Map<number,IRenderEntityBase>;
    private sceneGraph: RootNode;

    constructor() {
        this.sceneEntities = new Map<number,IRenderEntityBase>();
        this.sceneGraph = new RootNode();
    }

    public registerRenderEntitiy(entity:IRenderEntityBase): number {
        const {entityId} = entity;
        if(this.sceneEntities.has(entityId)) {
            return entityId;
        }

        let node:SceneNode|null = null;

        switch(entity.renderType) {
            case RenderEntityType.MODEL:
                node = new ModelNode(entity as IModelEntity, null, []);                
            break; 
        }

        if(node !== null) {
            this.sceneGraph.insertNode(node, -1 );
            log(LogEntryType.INFO, LogEntryModule.RENDERER, this.sceneGraph);
        }
        

        this.sceneEntities.set(entityId,entity);
        return entityId;
    }

    public getRenderQueue(): IRenderEntityBase[] {
        return Array.from(this.sceneEntities.values()); // TODO this needs further work
    }

}