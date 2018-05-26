import { Observable } from 'rxjs'

import { IGameObjectEvent } from "../EventSystem";

import { ComponentType, Entity, IMovable, ITransform } from '../ComponentSystem';

import { IVector3D } from '../Math';

export default class PhysicsSystem{

    private entities: Entity[];
    private gameObject$: Observable<IGameObjectEvent>;
    
    constructor(gameObject$: Observable<IGameObjectEvent>){
        this.gameObject$ = gameObject$;
        this. entities= new Array<Entity>();
    }
    
    public start(){
        this.gameObject$.subscribe(this.onGameObjectEvent.bind(this));
    }

    public update() {
        this.entities.forEach(entity => {
            // Check collissions
            if(entity.hasComponents([ComponentType.MOVABLE])){
                
                this.moveEntity(entity);
            }
        });
    }

    private onGameObjectEvent(event:IGameObjectEvent){
        console.log('PHYSICS: ', event)
        if(event.entity.hasComponents([ComponentType.TRANSFORM])){
            console.log('PHYSICS: Adding entity to physics', event.entity);
            this.entities.push(event.entity);
        }
    }

    private moveEntity(entity:Entity){
        const moveComponent = entity.getCompoenent(ComponentType.MOVABLE) as IMovable;
        const physicsComponent = entity.getCompoenent(ComponentType.TRANSFORM) as ITransform;

        const {velocity} = moveComponent;

        const distance: IVector3D = {
            x: velocity.x,
            y: velocity.y,
            z: velocity.z 
        }

        // TODO: Create Math.Add functions
        physicsComponent.position.x += distance.x;
        physicsComponent.position.y += distance.y;
        physicsComponent.position.z += distance.z;
    }
}