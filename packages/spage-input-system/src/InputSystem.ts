import { entity$, IEntityEvent, keyboardInput$ } from "spage-event-system";
import { ComponentType, IEntity, IMovable, ITransform } from 'spage-shared-interfaces';

import KeyboardInputService from './KeyboardInputService'


export default class InputSystem{

    private entities: IEntity[];
    private keyboardInputService : KeyboardInputService;

    constructor(){
        this. entities= new Array<IEntity>();

        this.keyboardInputService = new KeyboardInputService(keyboardInput$)
    }
    
    public init() : boolean {
        entity$.subscribe(this.onEntityEvent.bind(this));

        if(!this.keyboardInputService.init()) { return false; }
        
        return true;
    }

    public update() {
        this.entities.forEach(entity => {
            const movableComponent: IMovable = entity.getCompoenent(ComponentType.MOVABLE) as IMovable;
            const transformComponent: ITransform = entity.getCompoenent(ComponentType.TRANSFORM) as ITransform;
            this.keyboardInputService.update( movableComponent, transformComponent);
           
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