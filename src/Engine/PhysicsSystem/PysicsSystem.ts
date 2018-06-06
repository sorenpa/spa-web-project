import { Observable } from 'rxjs'

import { IEntityEvent } from "../EventSystem";

import { ComponentType, Entity, IMovable, ITransform } from '../ComponentSystem';

import { vec3 } from 'gl-matrix';

export default class PhysicsSystem{

    private entities: Entity[];
    private entity$: Observable<IEntityEvent>;
    
    constructor(entity$: Observable<IEntityEvent>){
        this.entity$ = entity$;
        this. entities= new Array<Entity>();
    }
    
    public init() : boolean{
        this.entity$.subscribe(this.onEntityEvent.bind(this));
        return true;
    }

    public update() {
        this.entities.forEach(entity => {
            // Check collissions
            if(entity.hasComponents([ComponentType.MOVABLE])){
                
                this.moveEntity(entity);
            }
        });
    }

    private onEntityEvent(event:IEntityEvent){
        console.log('PHYSICS: ', event)
        if(event.entity.hasComponents([ComponentType.TRANSFORM])){
            console.log('PHYSICS: Adding entity to physics', event.entity);
            this.entities.push(event.entity);
        }
    }

    private moveEntity(entity:Entity){
        const moveComponent = entity.getCompoenent(ComponentType.MOVABLE) as IMovable;
        const transformComponent = entity.getCompoenent(ComponentType.TRANSFORM) as ITransform;

        const {velocity} = moveComponent;

        vec3.add(transformComponent.position, transformComponent.position, velocity) ;
    }
}