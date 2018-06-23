import { vec3 } from 'gl-matrix';

import { entity$, IEntityEvent } from "spage-event-system";
import { ComponentType, IEntity, IMovable, ITransform } from 'spage-shared-interfaces';



export default class PhysicsSystem{

    private entities: IEntity[];
    
    constructor(){
        this. entities= new Array<IEntity>();
    }
    
    public init() : boolean{
        entity$.subscribe(this.onEntityEvent.bind(this));
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
        
        this.entities.push(event.entity);
    }


    private moveEntity(entity:IEntity){
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