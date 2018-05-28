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
                velocity.x = velocity.x > -maxSpeed ? velocity.x - acceleration.x : -maxSpeed;
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
                velocity.y = velocity.y > -maxSpeed ? velocity.y - acceleration.y : -maxSpeed;
            }
            else{
                velocity.y = velocity.y < maxSpeed ? velocity.y + acceleration.y : maxSpeed;
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