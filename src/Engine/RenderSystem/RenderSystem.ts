import * as Rx from 'rxjs';

import { IGameObjectEvent } from '../EventSystem';

import { ComponentType, Entity } from '../ComponentSystem';

import RenderModelManager from './RenderModelManager'
import { IRenderModel } from './RenderModelManager/Models';

import ShaderProgramManager from './ShaderProgramManager'
import { IShaderProgramInfo } from './ShaderProgramManager/interfaces';

/*
    This class is meant to handle the rendering of the game
*/
export default class RenderEngine {

    public canvas: HTMLCanvasElement;

    private sceneEntities: Entity[];

    private renderModelManager: RenderModelManager;
    private shaderProgramManager: ShaderProgramManager;

    private gl: WebGL2RenderingContext

    constructor(gameObject$: Rx.Observable<IGameObjectEvent>) {
        gameObject$.subscribe(this.onGameObjectEvent.bind(this));

        this.sceneEntities = new Array<Entity>();
        this.renderModelManager = new RenderModelManager();
        this.shaderProgramManager = new ShaderProgramManager();
    }

    public init() {
        this.initCanvas();
    }

    public render() {
        const gl = this.gl;

        // Shader program
        const programInfo: IShaderProgramInfo | null = this.shaderProgramManager.initShaderProgram(gl, 'vertexBase', 'fragmentBase');

        if (programInfo === null) { 
            console.log('programInfo is null'); 
            return; 
        }

        const model: IRenderModel|undefined = this.renderModelManager.GetModel('cube');

        if(model === undefined) { console.log('Model is null'); return; }

        this.initBuffers(gl, model.vertices);
    }
    

    private initBuffers(gl: WebGL2RenderingContext, vertices:number[]): WebGLBuffer | null {
        const positionBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(vertices),
            gl.STATIC_DRAW);

        return positionBuffer;
    }



    private onGameObjectEvent(event: IGameObjectEvent) {
        if (event.entity.hasComponents([ComponentType.VISIBLE, ComponentType.TRANSFORM])) {
            console.log('RENDER: Adding entity to scenegraph', event.entity);
            this.sceneEntities.push(event.entity)
        }
    }

    private initCanvas() {
        const canv = document.getElementById('glCanvas') as HTMLCanvasElement;

        if (canv != null) {
            this.canvas = canv;

            const ctx: WebGL2RenderingContext | null = this.canvas.getContext("webgl2")
            if (ctx !== null) {
                this.gl = ctx;
            }
            else {
                alert("Unable to initialize WebGL. Your browser or machine may not support it.");
                return;
            }
        }
        else {
            alert("Unable to initialize WebGL. Your browser or machine may not support it.");
            return;
        }
    }
}