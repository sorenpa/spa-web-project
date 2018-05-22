import { Subject } from "rxjs";

import { GameObjectUpdateType, IGameObjectEvent } from '../../EventSystem';
import Entity from "./Entity";

export default class EntityManager{

    private gameObjects: Map<string, Entity>;
    private gameObject$: Subject<IGameObjectEvent>

    constructor(gameObject$:Subject<IGameObjectEvent>){
        this.gameObjects = new Map<string,Entity>()
        this.gameObject$ = gameObject$;
    }

    public AddGameObject(entity: Entity){
        this.gameObjects.set(entity.getEntityId(), entity);

        this.gameObject$.next({
            entity,
            eventType: GameObjectUpdateType.CREATE,
        })
    }

}