import { Resource, ResourceFlag, ResourceType } from "./Resource";
import { TextureTypes, WebGlContextVersion } from "../../Renderer";


// enum ShaderResData {
//     ContextElem = 600,
//     SamplerElem,
//     UniformElem,
//     ContNameStr,
//     SampNameStr,
//     SampDefTexResI,
//     UnifNameStr,
//     UnifSizeI,
//     UnifDefValueF4
// };

enum BlendModes {
    Zero = 0,
    One,
    SrcAlpha,
    OneMinusSrcAlpha,
    DestAlpha,
    OneMinusDestAlpha,
    DestColor,
    SrcColor,
    OneMinusDestColor,
    OneMinusSrcColor
};

enum DepthTestModes {
    LessEqual,
    Less,
    Equal,
    Greater,
    GreaterEqual,
    Always
};

enum CullModes {
    Back,
    Front,
    None
};

interface IShaderCombination {
    combMask: number;

    shaderObj: number;
    lastUpdateStamp: number;

    // Engine uniforms
    uni_frameBufSize: number;
    uni_viewMat: number,
    uni_viewMatInv: number,
    uni_projMat: number,
    uni_viewProjMat: number,
    uni_viewProjMatInv: number,
    uni_viewerPos: number;
    uni_worldMat: number,
    uni_worldNormalMat: number,
    uni_nodeId: number,
    uni_customInstData: number;
    uni_skinMatRows: number;
    uni_lightPos: number,
    uni_lightDir: number,
    uni_lightColor: number;
    uni_shadowSplitDists: number,
    uni_shadowMats: number,
    uni_shadowMapSize: number,
    uni_shadowBias: number;
    uni_parPosArray: number,
    uni_parSizeAndRotArray: number,
    uni_parColorArray: number;
    uni_olayColor: number;

    customSamplers: number[];
    customUniforms: number[];
    customBuffers: number[];
}

interface IShaderContext {
    id: string;
    flagMask: number;

    // RenderConfig
    blendStateSrc: BlendModes[];
    blendStateDst: BlendModes[];
    depthFunc: DepthTestModes[];
    cullMode: CullModes[];
    tessVerticesInPatchCount: number;
    depthTest: boolean;
    writeDepth: boolean;
    alphaToCoverage: boolean;
    blendingEnabled: boolean;

    // Shaders
    shaderCombs: IShaderCombination[];
    vertCodeIdx: number,
    fragCodeIdx: number,
    geomCodeIdx: number,
    tessCtlCodeIdx: number,
    tessEvalCodeIdx: number,
    computeCodeIdx: number;
    compiled: boolean;
}

interface IShaderBuffer {
    id: string
}

interface IShaderSampler {
    id: string,
    type: TextureTypes[]
    texture: number;
    samplerState: number;
    usage: number;
}

interface IShaderUniform {
    id: string;
    defValues: number[];
    size: number;
}

export class ShaderResource extends Resource {

    public static constructorFunc(name: string, flag: ResourceFlag): Resource {
        return new ShaderResource(name, flag);
    }

    public static setPreambles( vertPreamble:string, fragPreamble:string, geomPreamble:string,
        tessCtlPreamble:string, tessEvalPreamble:string, computePreamble:string) {
        this.vertPreamble = vertPreamble; 
        this.fragPreamble = fragPreamble;
        this.geomPreamble = geomPreamble;
        this.tessCtlPreamble = tessCtlPreamble;
        this.tessEvalPreamble = tessEvalPreamble;
        this.computePreamble = computePreamble;
    }

    public static initializationFunc(webGlContextVersion: WebGlContextVersion){
        
        switch(webGlContextVersion) {
            case WebGlContextVersion.WebGl2:
                this.vertPreamble = "#version 300 es\r\n";
		        this.fragPreamble = "#version 300 es\r\n";
		        this.geomPreamble = "#version 300 es\r\n";
		        this.tessCtlPreamble = "#version 300 es\r\n";
		        this.tessEvalPreamble = "#version 300 es\r\n";
		        this.computePreamble = "#version 300 es\r\n";
            break;
            default:
            break;
        }
        
    }

    private static vertPreamble: string = '';
    private static fragPreamble: string = '';
    private static geomPreamble: string = '';
    private static tessCtlPreamble: string = '';
    private static tessEvalPreamble: string = '';
    private static computePreamble: string = '';

    private static tmpCodeVS: string = '';
    private static tmpCodeFS: string = '';
    private static tmpCodeGS: string = '';
    private static tmpCodeCS: string = '';
    private static tmpCodeTSCtl: string = '';
    private static tmpCodeTSEval: string = '';

    private defaultPreambleSet: boolean = false;

    private contexts: IShaderContext[];
    private samplers: IShaderSampler[];
    private uniforms: IShaderUniform[];
    private buffers: IShaderBuffer[];
    private codeSections: number[];
    private preLoadList: number[];

    constructor(name: string, flag: ResourceFlag) {
        super(name, ResourceType.Shader, flag);
    }

    

}