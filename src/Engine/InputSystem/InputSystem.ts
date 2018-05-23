
import { Observable } from 'rxjs'

import { IGameObjectEvent } from "../EventSystem";

import { Entity } from '../ComponentSystem';
import { ComponentType, IMovable, IPhysics } from '../ComponentSystem/Components/interfaces';

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
            const physicsComponent: IPhysics = entity.getCompoenent(ComponentType.PHYSICS) as IPhysics;
            
            const { velocity, acceleration, maxSpeed } = movableComponent;
            const {  } = physicsComponent;

            const {left, right} = this.moveX;
            const {up, down} = this.moveY;

            if(left === right){
                console.log(velocity)
                if(velocity.x > acceleration.x) {
                    velocity.x -= acceleration.x
                }
                else if(velocity.x < -acceleration.x){
                    velocity.x += acceleration.x
                } else {
                    velocity.x = 0;
                }
            }
            else if (left){
                velocity.x = velocity.x < maxSpeed ? velocity.x - acceleration.x : maxSpeed;
            }
            else{
                velocity.x = velocity.x < maxSpeed ? velocity.x + acceleration.x : maxSpeed;
            }
                
            if(up === down){
                if(velocity.y > acceleration.y) {
                    velocity.y -= acceleration.y
                }
                else if(velocity.y < -acceleration.y){
                    velocity.y += acceleration.y
                } else {
                    velocity.y = 0;
                }
            }
            else if (up){
                velocity.y = velocity.y < maxSpeed ? velocity.y - acceleration.y : maxSpeed;
            }
            else{
                velocity.y = velocity.y < maxSpeed ? velocity.y + acceleration.y : maxSpeed;
            }
           
        });
    }

    private onGameObjectEvent(event:IGameObjectEvent){
        if(event.entity.hasComponents([ComponentType.PLAYER, ComponentType.MOVABLE, ComponentType.PHYSICS])){
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