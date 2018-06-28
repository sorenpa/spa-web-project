import { Resource, ResourceFlag, ResourceType } from "./Resource";

export class MaterialResource extends Resource {

    public static constructorFunc(name:string, flag:ResourceFlag): Resource{
        return new MaterialResource(name,flag);
    }

    constructor(name:string, flag:ResourceFlag){
        super(name, ResourceType.Material,flag);
    }

    

    
}