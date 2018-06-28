import { Resource, ResourceFlag, ResourceType } from "./Resource";


export class ShaderResource extends Resource {

    public static constructorFunc(name:string, flag:ResourceFlag): Resource{
        return new ShaderResource(name,flag);
    }

    constructor(name:string, flag:ResourceFlag){
        super(name, ResourceType.Shader,flag);
    }

    
}