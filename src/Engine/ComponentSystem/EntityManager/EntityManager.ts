import { Subject } from "rxjs";

import { GameObjectUpdateType, IGameObjectEvent } from '../../../EventManager';
import Entity from "../Components/Entity";

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
            type: GameObjectUpdateType.CREATE,
        })
    }

}