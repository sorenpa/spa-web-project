import * as Rx from 'rxjs';

import { IEntityEvent } from '../EventSystem';

import { ComponentType } from '../ComponentSystem'; // TODO: I Should remove this by moving the ECS RX.Observable event handling outside the RenderSystem
import Renderer from './Renderer/Renderer';

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

    // TODO: can i get rid of this?
    public render() {
        this.renderer.render();
    }

    // TODO: we should probably convert from ECS entity to some RenderEntity type.
    private onEntityEvent(event: IEntityEvent) {
        const { entity } = event;
        if (entity.hasComponents([ComponentType.VISIBLE, ComponentType.TRANSFORM])) {
            this.renderer.registerEntity(entity);
            
        }
    }

}