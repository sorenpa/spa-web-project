import IRenderEntity from "../RenderEntity";


export default class SceneManager {
    private sceneEntities: Map<number,IRenderEntity>;

    constructor() {
        this.sceneEntities = new Map<number,IRenderEntity>();
    }

    public registerRenderEntitiy(entity:IRenderEntity): number {
        const {entityId} = entity;
        if(this.sceneEntities.has(entityId)) {
            return entityId;
        }

        this.sceneEntities.set(entityId,entity);
        return entityId;
    }

    
    public getRenderQueue(): IRenderEntity[] {
        return Array.from(this.sceneEntities.values()); // TODO this needs further work
    }

}