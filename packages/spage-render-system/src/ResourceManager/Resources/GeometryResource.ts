import { Resource, ResourceFlag, ResourceType } from "./Resource";


export class GeometryResource extends Resource {

    public static constructorFunc(name:string, flag:ResourceFlag): Resource{
        return new GeometryResource(name,flag);
    }

    constructor(name:string, flag:ResourceFlag){
        super(name, ResourceType.Geometry,flag);
    }

    
}