import { Resource, ResourceFlag, ResourceType } from "./Resource";


export class TextureResource extends Resource {

    public static constructorFunc(name:string, flag:ResourceFlag): Resource{
        return new TextureResource(name,flag);
    }

    constructor(name:string, flag:ResourceFlag){
        super(name, ResourceType.Texture,flag);
    }

    
}