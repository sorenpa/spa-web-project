import {IVector3D} from '../Math/interfaces'

export default abstract class GameObject{
    
    private position: IVector3D

    constructor(position: IVector3D={x:0,y:0,z:0}){
        this.position = position;
    }

    public GetPosition(): IVector3D {
        return this.position;
    }
}