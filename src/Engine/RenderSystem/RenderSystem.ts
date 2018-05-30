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

        const model: IRenderModel | undefined = this.renderModelManager.GetModel('test');

        if (model === undefined) { console.log('Model is null'); return; }

        const verts = [
            60, 70,
            130, 70,
            60, 80,
            60, 80,
            130, 70,
            130, 80,
          ];

        this.initBuffers(gl, model.vertices);

        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);

        gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

        const size = model.vertexSize;          // 2 components per iteration
        const type = gl.FLOAT;   // the data is 32bit floats
        const normalize = false; // don't normalize the data
        const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        const offset1 = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(
            programInfo.attribLocations.vertexPosition, size, type, normalize, stride, offset1)

        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);    

        // Clear the canvas
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Bind the attribute/buffer set we want.
        gl.bindVertexArray(vao);

        gl.useProgram(programInfo.program);

        gl.uniform4f(programInfo.uniformLocations.color, 1,0,0,1);
        gl.uniform2f(programInfo.uniformLocations.resolution, gl.canvas.width, gl.canvas.height);

        const primitiveType = gl.TRIANGLES;
        const offset2 = 0;
        const count = model.vertexCount;
        gl.drawArrays(primitiveType, offset2, count);

        
        
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(verts),
            gl.STATIC_DRAW);

          gl.uniform4f(programInfo.uniformLocations.color, 1,0,5,1);
          gl.drawArrays(primitiveType, offset2, count);
    }

    private initBuffers(gl: WebGL2RenderingContext, vertices: number[]): { position: WebGLBuffer } | null {
        const positionBuffer = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        if (positionBuffer === null) { return null; }

        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(vertices),
            gl.STATIC_DRAW);

        return {
            position: positionBuffer
        };
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