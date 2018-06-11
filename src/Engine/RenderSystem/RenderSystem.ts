import * as Rx from 'rxjs';

import { ComponentType, ITransform, IVisible } from '../ComponentSystem';
import { EntityEventType, IEntityEvent } from '../EventSystem';
import Renderer, { IRenderEntity } from './Renderer';

/*
    This class is meant to handle the rendering of the game
*/
export default class RenderSystem {

    private renderer: Renderer;

    constructor(entity$: Rx.Observable<IEntityEvent>) {
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
        const { entity } = event;
        
        if (entity.hasComponents([ComponentType.VISIBLE, ComponentType.TRANSFORM])) {
            if(event.eventType === EntityEventType.CREATE) {
                
                const visibleComponent = entity.getCompoenent(ComponentType.VISIBLE) as IVisible;
                const transformComponent = entity.getCompoenent(ComponentType.TRANSFORM) as ITransform;

                const renderEntity: IRenderEntity = {
                    color: visibleComponent.color,
                    direction: transformComponent.direction,
                    entityId: entity.getEntityId(),
                    geometryId:visibleComponent.modelId,
                    materialId: 0, // TODO: is this Default ok?
                    position: transformComponent.position,
                    positionBufffer: null,
                    scale: transformComponent.scale,
                }

                this.renderer.registerEntity(renderEntity, visibleComponent.shaders);
            }
        }
    }

}