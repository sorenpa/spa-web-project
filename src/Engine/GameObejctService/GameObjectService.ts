import { Subject } from "rxjs";

import GameObject from "../GameObjects/GameObject";
import RenderObject from "../GameObjects/RenderObject";
import { GameObjectUpdateType, IGameObjectEvent } from "./interfaces";



export default class GameObjectService{

    private gameObjects: Map<string, GameObject>;
    private gameObject$: Subject<IGameObjectEvent>

    constructor(gameObject$:Subject<IGameObjectEvent>){
        this.gameObjects = new Map<string,GameObject>()
        this.gameObject$ = gameObject$;
    }

    public AddGameObject(gameObject: GameObject){
        this.gameObjects.set(gameObject.GetGameObjectId(), gameObject);

        // TODO: We need to fix the type system here :D
        this.gameObject$.next({
            gameObjectId: gameObject.GetGameObjectId(),
            renderData : (gameObject as RenderObject).renderData,
            type: GameObjectUpdateType.CREATE
        })
    }

}