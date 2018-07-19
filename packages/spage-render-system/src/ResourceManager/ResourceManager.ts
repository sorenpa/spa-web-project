import { Log, LogLabel, ModuleLabel } from "spage-logging-system";

import { IResourceRegEntry } from "./IResourceRegEntry";
import { 
    CodeResource, 
    GeometryResource, 
    MaterialResource, 
    Resource, 
    ResourceFlag, 
    ResourceType, 
    ShaderResource, 
    TextureResource 
} from "./Resources";

export default class ResourceManager{

    public static registerDefaultResourceTypes() {
        
        this.registerResourceType(ResourceType.Material, "Material", null, null, MaterialResource.constructorFunc);
        this.registerResourceType(ResourceType.Geometry, "Geometry", null, null, GeometryResource.constructorFunc);
        this.registerResourceType(ResourceType.Shader, "Shader", null, null, ShaderResource.constructorFunc);
        this.registerResourceType(ResourceType.Texture, "Texture", null, null, TextureResource.constructorFunc);
        this.registerResourceType(ResourceType.Code, "Code", null, null, CodeResource.constructorFunc);
    }

    public static registerResourceType(resType:ResourceType, typeString:string, 
        resTypeInitFunc:(()=>void)|null, resTypeReleaseFunc:(()=>void)|null, resTypeConstructorFunc:(name:string, flag:ResourceFlag)=>Resource){
        
            const regEntry = this.resourceRegistry.get(resType);
            if(regEntry !== undefined) { return } // TODO: Log error - type is already created

            const entry:IResourceRegEntry = {
            resTypeConstructorFunc,
            resTypeInitFunc,
            resTypeReleaseFunc,
            typeString,
        } 

        this.resourceRegistry.set(resType,entry);
        Log.info(new LogLabel(ModuleLabel.RENDERER, 'ResourceManager.ts'), 'Registered resource type:', typeString)
    }

    public static addResource(type:ResourceType, name:string, flag:ResourceFlag, externalCall:boolean): number|undefined{

        if(name === ""){ return undefined }

        const resIndex = this.resources.findIndex((r) => (r.getType() === type && r.getName() === name));
        if(resIndex !== -1){
            if(externalCall){
                this.resources[resIndex].incrementExternalRefs();
            }
            return resIndex;
        }

        const regEntry = this.resourceRegistry.get(type);
        if(regEntry === undefined) { return undefined }

        const newResource = regEntry.resTypeConstructorFunc(name, flag);

        if(externalCall){
            newResource.incrementExternalRefs();
        }

        const index = this.resources.push(newResource) -1;
        Log.info(new LogLabel(ModuleLabel.RENDERER, 'ResourceManager.ts'), 'Added new Resource:', newResource)
        return index;
    }

    public static getResource(findFunc:(r:Resource)=>boolean): Resource|undefined {
        return this.resources.find(findFunc);
    }

    private static resources: Resource[] = new Array<Resource>();
    private static resourceRegistry: Map<number,IResourceRegEntry> = new Map<ResourceType,IResourceRegEntry>();
}