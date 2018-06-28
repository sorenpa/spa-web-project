
export enum ResourceType {
    Undefined = 0,
    SceneGraph,
    Geometry,
    Animation,
    Material,
    Code,
    Shader,
    Texture,
    ParticleEffect,
    Pipeline,
    ComputeBuffer
}

export enum ResourceFlag {
    NoQuery = 1,
    NoTexCompression = 2,
    NoTexMipmaps = 4,
    TexCubemap = 8,
    TexDynamic = 16,
    TexRenderable = 32,
    TexSRGB = 64
}

export const resourceTypeString: string[] = [
    'Undefined',
    'SceneGraph',
    'Geometry',
    'Animation',
    'Material',
    'Code',
    'Shader',
    'Texture',
    'ParticleEffect',
    'Pipeline',
    'ComputeBuffer'
]

export abstract class Resource {
    protected refCount: number;
    protected externalRefCount: number;
    protected name: string;
    protected type: ResourceType;
    protected flags: ResourceFlag;
    protected id: number;
    protected loaded: boolean;

    constructor(name: string, type: ResourceType, flags: ResourceFlag) {
        this.name = name;
        this.type = type;
        this.flags = flags;
        this.loaded = false;    
        this.refCount = 0;
    }

    public getName() {
        return this.name;
    }

    public getType(): ResourceType {
        return this.type;
    }

    public getTypeString(): string {
        return resourceTypeString[this.type];
    }

    public getFlags(): ResourceFlag {
        return this.flags;
    }

    public isLoaded():boolean {
        return this.loaded;
    }

    public incrementRefs(){this.refCount++;}
    public decrementRefs(){ 
        if(this.refCount === 0) { return } // TODO Error handle this?
        this.refCount--;
    }

    public incrementExternalRefs(){this.externalRefCount++;}
    public decrementExternalRefs(){ 
        if(this.refCount === 0) { return } // TODO Error handle this?
        this.externalRefCount--;
    } 

}