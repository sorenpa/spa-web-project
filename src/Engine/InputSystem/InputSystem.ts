
import { Observable } from 'rxjs'

import { IGameObjectEvent } from "../../EventManager";

import Entity from '../ComponentSystem/Components/Entity';
import { ComponentType } from '../ComponentSystem/Components/interfaces';

export default class InputSystem{

    private entities: Entity[];
    private gameObject$: Observable<IGameObjectEvent>;
    private userInput$:Observable<Event>;

    // private moveX: { left: boolean, right: boolean};
    // private moveY: { up: boolean, down: boolean};
    
    constructor(gameObject$: Observable<IGameObjectEvent>, userInput$:Observable<Event>){
        this.gameObject$ = gameObject$;
        this.userInput$ = userInput$;
        this. entities= new Array<Entity>();

        // this.moveX = { left: false, right: false };
        // this.moveY = { up: false, down:false };
    }
    
    public start(){
        this.gameObject$.subscribe(this.onGameObjectEvent.bind(this));
        this.userInput$.subscribe(this.onUserInputEvent.bind(this))
    }

    public update() {
        this.entities.forEach(entity => {
            console.log('INPUT for Entity', entity)
        });
    }

    private onGameObjectEvent(event:IGameObjectEvent){
        if(event.entity.hasComponents([ComponentType.PLAYER])){
            this.entities.push(event.entity);
        }
    }

    private onUserInputEvent(event:Event){
       const keyEvent: KeyboardEvent = event as KeyboardEvent;

       switch(keyEvent.key) {
           case "w":
            console.log('UP');
           break;
           case "a":
            console.log('LEFT');
           break;
           case "s":
            console.log('DOWN');
           break;
           case "d":
            console.log('RIGHT');
           break;
           default:
           break;
       }
        
    }
}