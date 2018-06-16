import { Observable } from "rxjs";
import { IMovable, ITransform } from "spage-shared-interfaces";
import { IKeyboardInputData } from './interfaces'


export default class KeyboardInputService {

    private keyboardInput$: Observable<Event>;
    private inputs: IKeyboardInputData;

    constructor(keyboardInput$: Observable<Event>) {
        this.keyboardInput$ = keyboardInput$;
        this.inputs = {
            a: false,
            d: false,
            e: false,
            q: false,
            s: false,
            w: false,


        }
    }

    public init(): boolean {
        this.keyboardInput$.subscribe(this.onKeyboardInputEvent.bind(this))
        return true;
    }

    public update(movableComponent: IMovable, transformComponent: ITransform) {

        const { deltaVelocity, acceleration } = movableComponent;
        const { direction } = transformComponent;

        const { w, s, a, d, q, e } = this.inputs;

        if (a === d) {
            deltaVelocity[0] = 0;
        }
        else if (a) {
            deltaVelocity[0] = - acceleration[0];
        }
        else {
            deltaVelocity[0] = acceleration[0];
        }

        if (w === s) {
            deltaVelocity[1] = 0;
        }
        else if (w) {
            deltaVelocity[1] = - acceleration[1];
        }
        else {
            deltaVelocity[1] = + acceleration[1];
        }

        if (q) {
            direction[0] += 1;
        }

        if (e) {
            direction[1] += 1;
        }
}

    private onKeyboardInputEvent(event: Event) {
    const keyEvent: KeyboardEvent = event as KeyboardEvent;

    switch (keyEvent.key) {
        case "w":
            this.inputs.w = keyEvent.type === 'keydown';
            break;
        case "a":
            this.inputs.a = keyEvent.type === 'keydown';
            break;
        case "s":
            this.inputs.s = keyEvent.type === 'keydown';
            break;
        case "d":
            this.inputs.d = keyEvent.type === 'keydown';
            break;
        case "q":
            this.inputs.q = keyEvent.type === 'keydown';
            break;
        case "e":
            this.inputs.e = keyEvent.type === 'keydown';
            break;
        default:
            break;
    }

}

}