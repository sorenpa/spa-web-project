import * as Rx from 'rxjs';

import { IGameObjectEvent } from '../EventSystem';

import { ComponentType, Entity, IVisible } from '../ComponentSystem';
import { IShaderProgram } from './ShaderProgramManager/Shaders/interfaces';
import ShaderProgramManager from './ShaderProgramManager';

// import RenderModelManager from './RenderModelManager'

// import ShaderProgramManager from './ShaderProgramManager'


/*
    This class is meant to handle the rendering of the game
*/
export default class RenderEngine {

    public canvas: HTMLCanvasElement;

    private sceneEntities: Entity[];

    // private renderModelManager: RenderModelManager;
    private shaderProgramManager: ShaderProgramManager;

    protected gl: WebGL2RenderingContext

    constructor(gameObject$: Rx.Observable<IGameObjectEvent>) {
        gameObject$.subscribe(this.onGameObjectEvent.bind(this));

        this.sceneEntities = new Array<Entity>();
        // this.renderModelManager = new RenderModelManager();
        this.shaderProgramManager = new ShaderProgramManager();
    }

    public init() : boolean {
        return this.initCanvas();
    }

    public render() {
        const gl = this.gl;

        // // Shader program
        const programInfo: IShaderProgram | undefined = this.shaderProgramManager.getShader('vertexBase', 'fragmentBase');

        // if (programInfo === null) {
        //     console.log('programInfo is null');
        //     return;
        // }

        // const model: IRenderModel | undefined = this.renderModelManager.GetModel('test');

        // if (model === undefined) { console.log('Model is null'); return; }

        // this.initBuffers(gl, model.vertices);

        // const vao = gl.createVertexArray();
        // gl.bindVertexArray(vao);

        // gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

        // const size = model.vertexSize;          // 2 components per iteration
        // const type = gl.FLOAT;   // the data is 32bit floats
        // const normalize = false; // don't normalize the data
        // const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        // const offset1 = 0;        // start at the beginning of the buffer
        // gl.vertexAttribPointer(
        //     programInfo.attribLocations.vertexPosition, size, type, normalize, stride, offset1)

        // gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);    

        // // Clear the canvas
        // gl.clearColor(0, 0, 0, 0);
        // gl.clear(gl.COLOR_BUFFER_BIT);

        // // Bind the attribute/buffer set we want.
        // gl.bindVertexArray(vao);

        // gl.useProgram(programInfo.program);

        // const mat = mat4.fromValues(
        //     2 / gl.canvas.width, 0, 0, 0,
        //     0, -2 / gl.canvas.height, 0, 0,
        //     0, 0, 2 / 400, 0,
        //    -1, 1, 0, 1,
        // );
        
        // mat4.translate(mat,mat,[300,200,0]);
        // mat4.rotate(mat,mat,degToRad(45), [1,0,0]);
        // mat4.rotate(mat,mat,degToRad(45), [0,1,0]);
        // mat4.rotate(mat,mat,degToRad(45), [0,0,1]);
        // mat4.scale(mat,mat,[1,1,1]);

        // gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, mat);
        // gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, mat);
        // gl.uniform4f(programInfo.uniformLocations.color, 1,0,0,1);

        // const primitiveType = gl.TRIANGLES;
        // const offset2 = 0;
        // const count = model.vertexCount;
        // gl.drawArrays(primitiveType, offset2, count);
    }

    // private initBuffers(gl: WebGL2RenderingContext, vertices: number[]): { position: WebGLBuffer } | null {
    //     const positionBuffer = gl.createBuffer();

    //     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    //     if (positionBuffer === null) { return null; }

    //     gl.bufferData(
    //         gl.ARRAY_BUFFER,
    //         new Float32Array(vertices),
    //         gl.STATIC_DRAW);

    //     return {
    //         position: positionBuffer
    //     };
    // }



    private onGameObjectEvent(event: IGameObjectEvent) {
        const {entity} = event;

        if (entity.hasComponents([ComponentType.VISIBLE, ComponentType.TRANSFORM])) {
            
            const visibleComponent = entity.getCompoenent(ComponentType.VISIBLE) as IVisible;

            const {fragmentShaderId,vertexShaderId } = visibleComponent.shaders;
            this.shaderProgramManager.registerShader(this.gl, vertexShaderId,fragmentShaderId);

            // TODO: Register the model and bind VAO, perhaps create a buffer for th entity ?

            console.log('RENDER: Adding entity to scenegraph', entity);
            this.sceneEntities.push(entity)


        }
    }

    private initCanvas() : boolean {
        const canv = document.getElementById('glCanvas') as HTMLCanvasElement;

        if (canv != null) {
            this.canvas = canv;

            const ctx: WebGL2RenderingContext | null = this.canvas.getContext("webgl2")
            if (ctx !== null) {
                this.gl = ctx;
            }
            else {
                alert("Unable to initialize WebGL. Your browser or machine may not support it.");
                return false;
            }
        }
        else {
            alert("Unable to initialize WebGL. Your browser or machine may not support it.");
            return false;
        }

        return true;
    }
}