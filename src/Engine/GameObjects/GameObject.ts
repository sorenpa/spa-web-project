import {IVector3D} from '../Math/interfaces'

export default abstract class GameObject{
    
    private gameObjectId: string;
    private position: IVector3D;

    constructor(gameObjectId:string, position: IVector3D={x:0,y:0,z:0}){
        this.gameObjectId = gameObjectId;
        this.position = position;
    }

    public GetPosition(): IVector3D {
        return this.position;
    }

    public GetGameObjectId(): string {
        return this.gameObjectId;
    }
}