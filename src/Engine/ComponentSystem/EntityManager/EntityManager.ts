import { Subject } from "rxjs";

import { EntityEventType, IEntityEvent } from '../../EventSystem';
import Entity from "./Entity";

export default class EntityManager{

    private entities: Map<number, Entity>;
    private entity$: Subject<IEntityEvent>

    constructor(entity$:Subject<IEntityEvent>){
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