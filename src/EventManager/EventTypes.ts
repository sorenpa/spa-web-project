import Entity from '../Engine/ComponentSystem/Components/Entity';

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