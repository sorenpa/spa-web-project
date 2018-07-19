import { vec4 } from "gl-matrix";

import { Resource, ResourceFlag, ResourceType } from "./Resource";

import { ComputeBufferResource } from "./ComputeBufferResource";
import { ShaderResource } from "./ShaderResource";
import { TextureResource } from "./TextureResource";

interface IMaterialBuffer {
    name: string,
    computeBufferResource: ComputeBufferResource // TODO ID or Ref ?
}

interface IMaterialTextureSampler {
    name: string,
    textureResource: TextureResource // TODO ID or Ref ?
}

interface IMaterialUniform {
    name: string,
    values: vec4
}

export class MaterialResource extends Resource {

    public static constructorFunc(name: string, flag: ResourceFlag): Resource {
        return new MaterialResource(name, flag);
    }

    private combMask: number;
    private shaderResource: number|undefined;
    private materialLink: number|undefined; 
    private buffers: IMaterialBuffer[];
    private textureSamplers: IMaterialTextureSampler[];
    private uniforms: IMaterialUniform[];


    constructor(name: string, flag: ResourceFlag) {
        super(name, ResourceType.Material, flag);
        this.initDefault();
    }

    public initDefault() {
        this.combMask = 0;
        this.buffers = new Array<IMaterialBuffer>();
        this.textureSamplers = new Array<IMaterialTextureSampler>();
        this.uniforms = new Array<IMaterialUniform>();

        return;
    };

    public load(data: string, size: number): boolean {
        return false;
    }

    public setUniform(name: string, values: vec4): boolean {
        const uniform: IMaterialUniform | undefined = this.uniforms.find(u => u.name === name)
        if (uniform === undefined) {
            return false;
        }

        uniform.values = values;
        return true;
    };

    public getBufferCount(): number {
        return this.buffers.length
    }

    public getTextureSamplerCount(): number {
        return this.textureSamplers.length
    }

    public getUniformCount(): number {
        return this.uniforms.length
    }

    public getBuffer(buffIdx:number): IMaterialBuffer|undefined {
        if(buffIdx>this.buffers.length-1 || buffIdx<0){
            return undefined
        }

        return this.buffers[buffIdx];
    }

    public getTextureSampler(textureIdx:number): IMaterialTextureSampler|undefined {
        if(textureIdx>this.textureSamplers.length-1 || textureIdx<0){
            return undefined
        }

        return this.textureSamplers[textureIdx];
    }

    public getUniform(uniformIdx:number): IMaterialUniform|undefined {
        if(uniformIdx>this.uniforms.length-1 || uniformIdx<0){
            return undefined
        }

        return this.uniforms[uniformIdx];
    }
}