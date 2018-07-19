import { Resource, ResourceFlag, ResourceType } from "./Resource";
import { Log, LogLabel, ModuleLabel } from "spage-logging-system";
import ResourceManager from "../ResourceManager";

interface IDenpendency {
    CodeResourceId: number
    location: number
}

export class CodeResource extends Resource {

    public static constructorFunc(name:string, flag:ResourceFlag): Resource{
        return new CodeResource(name,flag);
    }

    private code:string;
    private flagMask: number;
    private dependencies: IDenpendency[]

    constructor(name:string, flag:ResourceFlag){
        super(name, ResourceType.Code,flag);
        this.initDefault();
    }

    public initDefault(){
        this.flagMask = 0b0;
        this.code = '';
        this.dependencies = new Array<IDenpendency>();
    }

    public load() :boolean {
        Log.info(new LogLabel(ModuleLabel.RENDERER,'CodeResource.ts'), 'Load is not implemented yet');
        return false;
    }

    public tryLinking(flagMask:number): boolean {
        if(!this.loaded) { return false }

        if(this.flagMask === 0b0) {
            this.flagMask |= flagMask;
        }

        let dependenciesLinked: boolean = true;
        this.dependencies.forEach(d => 
            {
                const codeDependency = ResourceManager.getResource((r) => r.getId() === d.CodeResourceId) as CodeResource
                dependenciesLinked = codeDependency.tryLinking(this.flagMask)
            })

        return dependenciesLinked;
    }

    public assembleCode(): string {
        if(!this.loaded) { return '' }

        let finalCode: string = this.code;
        let offset: number = 0;

        this.dependencies.forEach(d => {
            const codeDependency = ResourceManager.getResource((r) => r.getId() === d.CodeResourceId) as CodeResource
            codeDependency.assembleCode();
            finalCode = finalCode.substr(0 + offset, d.location) + codeDependency.code + finalCode.substr(d.location+1); 
            offset += codeDependency.code.length;
        })

        return finalCode;
    }

    public hasDependency(codeResource:CodeResource) : boolean {
        if(codeResource.id === this.id){ return true } 
        return this.dependencies.some(d => d.CodeResourceId === codeResource.id)
    }

    public updateShaders() {
        Log.warn(new LogLabel(ModuleLabel.RENDERER, 'CodeResource.ts'), 'updateShaders Not implemented');
    }
    
}