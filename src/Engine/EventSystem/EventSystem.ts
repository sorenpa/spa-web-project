import { fromEvent, interval, merge, Observable, Subject } from "rxjs";
import { IEntityEvent } from "./EventTypes";

// Constants
const LOOP_INTERVAL = 16;

// Streams
export const gameloop$ : Observable<number> = interval(LOOP_INTERVAL);

export const entity$ : Subject<IEntityEvent> = new Subject<IEntityEvent>()

export const keydown$ : Observable<Event> = fromEvent(document,'keydown');
export const keyup$ : Observable<Event> = fromEvent(document,'keyup');
export const keyboardInput$ : Observable<Event> = merge(keydown$, keyup$);
