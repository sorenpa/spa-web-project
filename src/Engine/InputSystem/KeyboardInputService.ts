import { Observable } from "rxjs";
import { IMovable } from "../ComponentSystem";
import { IKeyboardInputData } from './interfaces'


export default class KeyboardInputService {

    private keyboardInput$: Observable<Event>;
    private inputs: IKeyboardInputData;

    constructor(keyboardInput$:Observable<Event>){
        this.keyboardInput$ = keyboardInput$;
        this.inputs = {
            down: false,
            left:false, 
            right:false,
            up:false
        }
    }

    public init() {
        this.keyboardInput$.subscribe(this.onKeyboardInputEvent.bind(this))
    }

    public update(movableComponent:IMovable) {
        
        const { velocity, acceleration, maxSpeed } = movableComponent;

            const {up ,down,left,right} = this.inputs;

            if(left === right){
                if(velocity[0] > acceleration[0]) {
                    velocity[0] -= acceleration[0]
                }
                else if(velocity[0] < -acceleration[0]){
                    velocity[0] += acceleration[0]
                } else {
                    velocity[0] = 0;
                }
            }
            else if (left){
                velocity[0] = velocity[0] > -maxSpeed ? velocity[0] - acceleration[0] : -maxSpeed;
            }
            else{
                velocity[0] = velocity[0] < maxSpeed ? velocity[0] + acceleration[0] : maxSpeed;
            }
                
            if(up === down){
                if(velocity[1] > acceleration[1]) {
                    velocity[1] -= acceleration[1]
                }
                else if(velocity[1] < -acceleration[1]){
                    velocity[1] += acceleration[1]
                } else {
                    velocity[1] = 0;
                }
            }
            else if (up){
                velocity[1] = velocity[1] > -maxSpeed ? velocity[1] - acceleration[1] : -maxSpeed;
            }
            else{
                velocity[1] = velocity[1] < maxSpeed ? velocity[1] + acceleration[1] : maxSpeed;
            }
    }

    private onKeyboardInputEvent(event:Event){
        const keyEvent: KeyboardEvent = event as KeyboardEvent;
 
        switch(keyEvent.key) {
            case "w":
             this.inputs.up = keyEvent.type === 'keydown';
            break;
            case "a":
             this.inputs.left = keyEvent.type === 'keydown';
            break;
            case "s":
             this.inputs.down = keyEvent.type === 'keydown';
            break;
            case "d":
             this.inputs.right = keyEvent.type === 'keydown';
            break;
            default:
            break;
        }
         
     }

}