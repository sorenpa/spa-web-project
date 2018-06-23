import { Subject } from "rxjs";

import { entity$, EntityEventType, IEntityEvent } from 'spage-event-system';
import Entity from "./Entity";

export default class EntityManager{

    private entities: Map<number, Entity>;
    private entity$: Subject<IEntityEvent>

    constructor(){
        this.entities = new Map<number,Entity>()
        this.entity$ = entity$;
    }

    public AddEntity(entity: Entity){
        this.entities.set(entity.getEntityId(), entity);

        this.entity$.next({
            entity,
            eventType: EntityEventType.CREATE,
        })
    }

}