import {Entity} from '../ComponentSystem/';

export enum GameObjectUpdateType
{
    CREATE,
    UPDATE,
    DELETE
}

export interface IGameObjectEvent
{
    eventType: GameObjectUpdateType,
    entity: Entity,
}

export interface IUserInputEvent{
    event: KeyboardEvent
}