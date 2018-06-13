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
            if((entity.getComponentKey() & ComponentType.MOVABLE) > 0 ){
                
                this.moveEntity(entity);
            }
        });
    }

    private onEntityEvent(event:IEntityEvent){
        
        // Filter the component key
        const componentKey = event.entity.getComponentKey();
        const bitMask = ComponentType.TRANSFORM;
        const filteredKey = componentKey & bitMask;

        // Filter out all entities withough the wanted components.
        if(filteredKey !== bitMask) {return;}
        
        console.log('PHYSICS: Adding entity to physics', event.entity);
        this.entities.push(event.entity);
    }


    private moveEntity(entity:Entity){
        const moveComponent = entity.getCompoenent(ComponentType.MOVABLE) as IMovable;
        const transformComponent = entity.getCompoenent(ComponentType.TRANSFORM) as ITransform;

        const {acceleration, deltaVelocity, maxSpeed, velocity} = moveComponent;

        // Decay velocity if theres no deltaVelocity
          for(let i=0;i<3;i++) {
            if(deltaVelocity[i]===0){
                if(velocity[i] > acceleration[i]) {
                    velocity[i] -= acceleration[i]
                }
                else if(velocity[i] < -acceleration[i]){
                    velocity[i] += acceleration[i]
                } 
                else {
                    velocity[i] = 0;
                }
            }
            else if(velocity[i]<maxSpeed && velocity[i]>-maxSpeed) {
                velocity[i] += deltaVelocity[i];
            }
        }
     
        vec3.add(transformComponent.position, transformComponent.position, velocity) ;
    }
}