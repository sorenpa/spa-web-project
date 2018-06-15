import { entity$, EntityEventType, IEntityEvent } from 'spage-event-system';
import { ComponentType, ITransform, IVisible } from 'spage-shared-interfaces';

import { IRenderEntityBase, RenderEntityType } from './RenderEntity';
import Renderer from './Renderer';

/*
    This class is meant to handle the rendering of the game
*/
export default class RenderSystem {

    private renderer: Renderer;

    constructor() {
        entity$.subscribe(this.onEntityEvent.bind(this));
        this.renderer = new Renderer();
    }

    public init(): boolean {
        return this.renderer.init();
    }

    public render() {
        this.renderer.render();
    }

    private onEntityEvent(event: IEntityEvent) {
        const { entity, eventType } = event;

        // Filter the component key
        const componentKey = entity.getComponentKey();
        const bitMask = 0b11;
        const filteredKey = componentKey & bitMask;

        // Filter out all entities withough the wanted components.
        if(filteredKey === 0b0) {return;}

        switch(eventType) {
            case EntityEventType.CREATE:
                switch(filteredKey) {
                    case 0b11: // Components: Transform, Visible -> ModelNode
                        const transformComponent = entity.getCompoenent(ComponentType.TRANSFORM) as ITransform;
                        const visibleComponent = entity.getCompoenent(ComponentType.VISIBLE) as IVisible;

                        const entityBase: IRenderEntityBase = {
                            direction: transformComponent.direction,
                            entityId: entity.getEntityId(),
                            position: transformComponent.position,
                            renderType: RenderEntityType.MODEL,
                            scale: transformComponent.scale,
                        }
                        
                        this.renderer.registerModelEntity(entityBase, visibleComponent.color, visibleComponent.modelId, visibleComponent.materialId);
                    break;
                }
            return;
            default:
            return;
        }
    }
}