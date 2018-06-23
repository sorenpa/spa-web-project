import {IEntity} from 'spage-shared-interfaces';

export enum EntityEventType
{
    CREATE,
    UPDATE,
    DELETE
}

export interface IEntityEvent
{
    eventType: EntityEventType,
    entity: IEntity,
}

export interface IUserInputEvent{
    event: KeyboardEvent
}

