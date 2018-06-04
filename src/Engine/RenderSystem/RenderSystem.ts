import { mat4 } from 'gl-matrix';
import * as Rx from 'rxjs';

import { IGameObjectEvent } from '../EventSystem';

import { ComponentType, Entity, ITransform, IVisible, } from '../ComponentSystem';
import RenderModelManager from './RenderModelManager';
import { RenderModel } from './RenderModelManager/Models';
import ShaderProgramManager from './ShaderProgramManager';
import { IShaderPair, IShaderProgram } from './ShaderProgramManager/Shaders/interfaces';

import { degToRad } from './webGlUtils';

// import RenderModelManager from './RenderModelManager'

// import ShaderProgramManager from './ShaderProgramManager'

/*
    This class is meant to handle the rendering of the game
*/
export default class RenderEngine {

    public canvas: HTMLCanvasElement;
    private sceneEntities: Map<string, Map<string, Entity[]>>;

    private renderModelManager: RenderModelManager;
    private shaderProgramManager: ShaderProgramManager;

    private gl: WebGL2RenderingContext

    constructor(gameObject$: Rx.Observable<IGameObjectEvent>) {
        gameObject$.subscribe(this.onGameObjectEvent.bind(this));

        this.sceneEntities = new Map<string, Map<string, Entity[]>>();
        this.renderModelManager = new RenderModelManager();
        this.shaderProgramManager = new ShaderProgramManager();
    }

    public init(): boolean {
        return this.initCanvas();
    }

    public render() {
        const gl = this.gl;

        // Clear the canvas
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);    

        this.sceneEntities.forEach((modelMap, programId) => {
            const shaderProgram: IShaderProgram | undefined = this.shaderProgramManager.getShader(programId);

            if (shaderProgram === undefined) {
                console.log('RenderSystem.render: shaderProgram is undefined');
                return;
            }

            gl.useProgram(shaderProgram.program);

            modelMap.forEach((entities, modelId) => {
                const model: RenderModel | undefined = this.renderModelManager.getModel(modelId)
                if (model === undefined) {
                    console.log('RenderSystem.render: Model is undefined')
                    return;
                }

                entities.forEach((entity) => {

                    const tc = entity.getCompoenent(ComponentType.TRANSFORM) as ITransform;
                    const vc = entity.getCompoenent(ComponentType.VISIBLE) as IVisible;

                    gl.bindBuffer(gl.ARRAY_BUFFER, vc.positionBufffer);

                    this.gl.bufferData(
                        this.gl.ARRAY_BUFFER,
                        new Float32Array(model.vertices),
                        this.gl.STATIC_DRAW);

                        gl.bindVertexArray(model.vao);

                        const positionAttributeLocation = shaderProgram.attributeLocations.get('a_VertexPosition');
        
                        if (positionAttributeLocation === undefined) {
                            console.log('RenderSystem.render: some attribute locations are undefined')
                            return;
                        }
        
                        gl.enableVertexAttribArray(positionAttributeLocation);
        
                        const size = model.vertexSize;          // 2 components per iteration
                        const type = gl.FLOAT;   // the data is 32bit floats
                        const normalize = false; // don't normalize the data
                        const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
                        const offset1 = 0;        // start at the beginning of the buffer
                        gl.vertexAttribPointer(
                            positionAttributeLocation, size, type, normalize, stride, offset1)

                        

                    const mvMat = mat4.fromValues(
                        2 / gl.canvas.width, 0, 0, 0,
                        0, -2 / gl.canvas.height, 0, 0,
                        0, 0, 2 / 400, 0,
                        -1, 1, 0, 1,
                    );
                    mat4.translate(mvMat, mvMat, tc.position);
                    mat4.rotate(mvMat, mvMat, degToRad(tc.direction[0]), [1, 0, 0]);
                    mat4.rotate(mvMat, mvMat, degToRad(tc.direction[1]), [0, 1, 0]);
                    mat4.rotate(mvMat, mvMat, degToRad(tc.direction[2]), [0, 0, 1]);
                    mat4.scale(mvMat, mvMat, tc.scale);
                    const projectionLocation: WebGLUniformLocation | null | undefined = shaderProgram.uniformLocations.get('u_ProjectionMatrix');

                    if (projectionLocation === undefined || projectionLocation === null) {
                        console.log('RenderSystem.render: projectionLocation is undefined or null')
                        return;
                    }

                    const colorLocation: WebGLUniformLocation | null | undefined = shaderProgram.uniformLocations.get('u_Color');

                    if (colorLocation === undefined || colorLocation === null) {
                        console.log('RenderSystem.render: colorLocation is undefined or null')
                        return;
                    }

                    gl.uniformMatrix4fv(projectionLocation, false, mvMat);
                    gl.uniform4f(colorLocation, vc.color[0], vc.color[1], vc.color[2], vc.color[3]);

                    const primitiveType = gl.TRIANGLES;
                    const offset2 = 0;
                    const count = model.vertexCount;
                    gl.drawArrays(primitiveType, offset2, count);
                })
            })
        });

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
        const { entity } = event;

        if (entity.hasComponents([ComponentType.VISIBLE, ComponentType.TRANSFORM])) {

            const visibleComponent = entity.getCompoenent(ComponentType.VISIBLE) as IVisible;

            const shaderPair: IShaderPair = { ...visibleComponent.shaders };
            const programId: string = this.shaderProgramManager.registerShader(this.gl, shaderPair);

            // TODO: Register the model and bind VAO, perhaps create a buffer for the entity ?
            this.renderModelManager.registerModel(this.gl, visibleComponent.modelId);

            const model = this.renderModelManager.getModel(visibleComponent.modelId);

            if (model === undefined) { return; }

            const positionBuffer = this.gl.createBuffer();
            if (positionBuffer === null) { return; }
            visibleComponent.positionBufffer = positionBuffer;

            console.log('RENDER: Adding entity to scenegraph', entity);
            let modelMap: Map<string, Entity[]> | undefined = this.sceneEntities.get(programId);

            if (modelMap === undefined) {
                modelMap = new Map<string, Entity[]>();
                this.sceneEntities.set(programId, modelMap);
            }

            let entityArray: Entity[] | undefined = modelMap.get(visibleComponent.modelId);

            if (entityArray === undefined) {
                entityArray = new Array<Entity>();
                modelMap.set(visibleComponent.modelId, entityArray);
            }

            entityArray.push(entity);
        }
    }

    private initCanvas(): boolean {
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