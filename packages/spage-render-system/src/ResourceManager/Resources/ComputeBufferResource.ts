import { Resource, ResourceFlag, ResourceType } from "./Resource";


export class ComputeBufferResource extends Resource {

    public static constructorFunc(name:string, flag:ResourceFlag): Resource{
        return new ComputeBufferResource(name,flag);
    }

    constructor(name:string, flag:ResourceFlag){
        super(name, ResourceType.ComputeBuffer,flag);
    }

    
}