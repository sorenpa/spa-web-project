import { Resource, ResourceFlag } from "./Resources";

export interface IResourceRegEntry {
    typeString: string,
    resTypeInitFunc: (()=>void)|null,
    resTypeReleaseFunc: (()=>void)|null,
    resTypeConstructorFunc: (name: string, flags: ResourceFlag)=>Resource
}

