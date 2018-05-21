import Entity from '../Engine/ComponentSystem/Components/Entity';

export enum GameObjectUpdateType
{
    CREATE,
    UPDATE,
    DELETE
}

export interface IGameObjectEvent
{
    type: GameObjectUpdateType,
    entity: Entity,
}