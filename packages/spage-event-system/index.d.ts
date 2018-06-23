import { fromEvent, interval, merge, Observable, Subject } from "rxjs";
import { IEntity } from 'spage-shared-interfaces';

declare module "spage-event-system" {
    // Constants
    const LOOP_INTERVAL = 16;

    // Streams
    export const gameloop$: Observable<number>;
    export const entity$: Subject<IEntityEvent>;
    // Input
    export const keydown$: Observable<Event>;
    export const keyup$: Observable<Event>;
    export const keyboardInput$: Observable<Event>;
 
    export enum EntityEventType {
        CREATE,
        UPDATE,
        DELETE
    }

    export interface IEntityEvent {
        eventType: EntityEventType,
        entity: IEntity,
    }

    export interface IUserInputEvent {
        event: KeyboardEvent
    }

}

