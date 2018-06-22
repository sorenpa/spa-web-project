import { IResourceRegEntry } from "./IResourceRegEntry";
import { MaterialResource, Resource, ResourceFlag, ResourceType } from "./Resources";



export default class ResourceManager{
    
    private resources: Resource[];
    private resourceRegistry: Map<number,IResourceRegEntry>;

    constructor(){
        this.resources = new Array<Resource>();
        this.resourceRegistry = new Map<ResourceType,IResourceRegEntry>();

        console.log('ResourceManager Construction')
        // Register resource types
        this.registerResourceType(ResourceType.Material, "Material", null, null, MaterialResource.constructorFunc);
    }

    public registerResourceType(resType:ResourceType, typeString:string, 
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
        console.log('added a new resRegEntry:',entry,this.resourceRegistry)
    }

    // TODO: The 'name' param has a bad name. It is used to supply file path to the resource.
    public addResource(type:ResourceType, name:string, flag:ResourceFlag, externalCall:boolean): number|undefined{

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
        console.log('Added resource:',newResource, this.resources)
        return index;

    }
}