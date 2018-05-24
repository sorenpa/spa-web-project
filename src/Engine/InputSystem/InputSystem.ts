import { Observable } from 'rxjs'

import { ComponentType, Entity, IMovable } from '../ComponentSystem';
import { IGameObjectEvent } from "../EventSystem";
import KeyboardInputService from './KeyboardInputService'


export default class InputSystem{

    private entities: Entity[];
    private gameObject$: Observable<IGameObjectEvent>;
    private keyboardInputService : KeyboardInputService;

    constructor(gameObject$: Observable<IGameObjectEvent>, keyboardInput$:Observable<Event>){
        this.gameObject$ = gameObject$;
        this. entities= new Array<Entity>();

        this.keyboardInputService = new KeyboardInputService(keyboardInput$)
    }
    
    public start(){
        this.gameObject$.subscribe(this.onGameObjectEvent.bind(this));
        this.keyboardInputService.start();
    }

    public update() {
        this.entities.forEach(entity => {
            const movableComponent: IMovable = entity.getCompoenent(ComponentType.MOVABLE) as IMovable;
            // const physicsComponent: IPhysics = entity.getCompoenent(ComponentType.PHYSICS) as IPhysics;
            
            this.keyboardInputService.update(movableComponent)
           
        });
    }

    private onGameObjectEvent(event:IGameObjectEvent){
        if(event.entity.hasComponents([ComponentType.PLAYER, ComponentType.MOVABLE, ComponentType.PHYSICS])){
            this.entities.push(event.entity);
        }
    }


}