
import { Observable } from 'rxjs'

import { IGameObjectEvent } from "../EventSystem";

import { Entity } from '../ComponentSystem';
import { ComponentType, IMovable } from '../ComponentSystem/Components/interfaces';

export default class InputSystem{

    private entities: Entity[];
    private gameObject$: Observable<IGameObjectEvent>;
    private userInput$:Observable<Event>;

    private moveX: { left: boolean, right: boolean};
    private moveY: { up: boolean, down: boolean};
    
    constructor(gameObject$: Observable<IGameObjectEvent>, userInput$:Observable<Event>){
        this.gameObject$ = gameObject$;
        this.userInput$ = userInput$;
        this. entities= new Array<Entity>();

        this.moveX = { left: false, right: false };
        this.moveY = { up: false, down:false };
    }
    
    public start(){
        this.gameObject$.subscribe(this.onGameObjectEvent.bind(this));
        this.userInput$.subscribe(this.onUserInputEvent.bind(this))
    }

    public update() {
        this.entities.forEach(entity => {
            const movableComponent: IMovable = entity.getCompoenent(ComponentType.MOVABLE) as IMovable;
            
            const { velocity, acceleration } = movableComponent;

            const {left, right} = this.moveX;
            const {up, down} = this.moveY;

            if(left === right){
                velocity.x = 0;
            }
            else if (left){
                velocity.x = -acceleration.x;
            }
            else{
                velocity.x = acceleration.x;
            }
                
            if(up === down){
                velocity.y = 0;
            }
            else if (up){
                velocity.y = -acceleration.y;
            }
            else{
                velocity.y = acceleration.y;    
            }
            
            console.log(velocity);
        });
    }

    private onGameObjectEvent(event:IGameObjectEvent){
        if(event.entity.hasComponents([ComponentType.PLAYER, ComponentType.MOVABLE])){
            this.entities.push(event.entity);
        }
    }

    private onUserInputEvent(event:Event){
       const keyEvent: KeyboardEvent = event as KeyboardEvent;

       switch(keyEvent.key) {
           case "w":
            this.moveY.up = keyEvent.type === 'keydown';
           break;
           case "a":
            this.moveX.left = keyEvent.type === 'keydown';
           break;
           case "s":
            this.moveY.down = keyEvent.type === 'keydown';
           break;
           case "d":
            this.moveX.right = keyEvent.type === 'keydown';
           break;
           default:
           break;
       }
        
    }
}