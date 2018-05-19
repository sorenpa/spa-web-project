import IGameObjectRenderData from "../GameObjects/interfaces";

export enum GameObjectUpdateType
{
    CREATE,
    UPDATE,
    DELETE
}

export interface IGameObjectEvent
{
    type: GameObjectUpdateType,
    gameObjectId: string,
    renderData: IGameObjectRenderData
}

