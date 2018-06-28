import { Resource, ResourceFlag, ResourceType } from "./Resource";


export class CodeResource extends Resource {

    public static constructorFunc(name:string, flag:ResourceFlag): Resource{
        return new CodeResource(name,flag);
    }

    constructor(name:string, flag:ResourceFlag){
        super(name, ResourceType.Code,flag);
    }

    
}