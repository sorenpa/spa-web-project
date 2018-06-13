import { Observable } from 'rxjs'

import { ComponentType, Entity, IMovable } from '../ComponentSystem';
import { IEntityEvent } from "../EventSystem";
import KeyboardInputService from './KeyboardInputService'


export default class InputSystem{

    private entities: Entity[];
    private entity$: Observable<IEntityEvent>;
    private keyboardInputService : KeyboardInputService;

    constructor(entity$: Observable<IEntityEvent>, keyboardInput$:Observable<Event>){
        this.entity$ = entity$;
        this. entities= new Array<Entity>();

        this.keyboardInputService = new KeyboardInputService(keyboardInput$)
    }
    
    public init() : boolean {
        this.entity$.subscribe(this.onEntityEvent.bind(this));

        if(!this.keyboardInputService.init()) { return false; }
        
        return true;
    }

    public update() {
        this.entities.forEach(entity => {
            const movableComponent: IMovable = entity.getCompoenent(ComponentType.MOVABLE) as IMovable;
            // const physicsComponent: IPhysics = entity.getCompoenent(ComponentType.PHYSICS) as IPhysics;
            
            this.keyboardInputService.update(movableComponent)
           
        });
    }

    private onEntityEvent(event:IEntityEvent){
        
        const componentKey: number = event.entity.getComponentKey();
        const bitMask = ComponentType.PLAYER | ComponentType.MOVABLE | ComponentType.TRANSFORM;
        const filteredKey = componentKey & bitMask;
        
        if(filteredKey !== bitMask) { return; }

        this.entities.push(event.entity);
    }


}