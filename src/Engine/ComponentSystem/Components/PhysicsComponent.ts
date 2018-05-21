import { ComponentType, IPhysics } from "./interfaces";

import { IVector3D } from "../../Shared/Math";

export default class PhysicsCompnent implements IPhysics
{
    public componentId: string;
    public componentType: ComponentType = ComponentType.PHYSICS;
    
    public direction: IVector3D;
    public position: IVector3D;
    public scale: IVector3D;
}