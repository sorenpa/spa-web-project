import {Entity} from '../ComponentSystem/';

export enum EntityEventType
{
    CREATE,
    UPDATE,
    DELETE
}

export interface IEntityEvent
{
    eventType: EntityEventType,
    entity: Entity,
}

export interface IUserInputEvent{
    event: KeyboardEvent
}