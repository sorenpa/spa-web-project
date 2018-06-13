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

    public init() : boolean {
        this.keyboardInput$.subscribe(this.onKeyboardInputEvent.bind(this))
        return true;
    }

    public update(movableComponent:IMovable) {
        
        const { deltaVelocity, acceleration } = movableComponent;

            const {up ,down,left,right} = this.inputs;

            if(left === right){
                deltaVelocity[0] = 0;
            }
            else if (left){
                deltaVelocity[0] = - acceleration[0];
            }
            else{
                deltaVelocity[0] = acceleration[0];
            }
                
            if(up === down){
                deltaVelocity[1] = 0;
            }
            else if (up){
                deltaVelocity[1] = - acceleration[1];
            }
            else{
                deltaVelocity[1] = + acceleration[1];
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