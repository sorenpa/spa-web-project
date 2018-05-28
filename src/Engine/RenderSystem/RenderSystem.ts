import { mat4 } from 'gl-matrix';
import * as Rx from 'rxjs';

import { IGameObjectEvent } from '../EventSystem';

import { ComponentType, Entity, ITransform, IVisible } from '../ComponentSystem';

import RenderModelManager from './RenderModelManager'

import { IRenderModel } from './RenderModelManager/Models';

import ShaderProgramManager from './ShaderProgramManager'


/*
    This class is meant to handle the rendering of the game
*/
export default class RenderEngine {

    public canvas: HTMLCanvasElement;

    private sceneEntities: Entity[];

    private renderModelManager: RenderModelManager;
    private shaderProgramManager: ShaderProgramManager;

    private gl: WebGLRenderingContext

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

        gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
        gl.clearDepth(1.0);                 // Clear everything
        gl.enable(gl.DEPTH_TEST);           // Enable depth testing
        gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

        // Clear the canvas before we start drawing on it.

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Create a perspective matrix, a special matrix that is
        // used to simulate the distortion of perspective in a camera.
        // Our field of view is 45 degrees, with a width/height
        // ratio that matches the display size of the canvas
        // and we only want to see objects between 0.1 units
        // and 100 units away from the camera.

        const fieldOfView = 45 * Math.PI / 180;   // in radians
        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        const zNear = 0.1;
        const zFar = 100.0;
        const projectionMatrix = mat4.create();

        // note: glmatrix.js always has the first argument
        // as the destination to receive the result.
        mat4.perspective(projectionMatrix,
            fieldOfView,
            aspect,
            zNear,
            zFar);

        this.sceneEntities.forEach(elem => {
            const vc: IVisible = elem.getCompoenent(ComponentType.VISIBLE) as IVisible;
            const tc: ITransform = elem.getCompoenent(ComponentType.TRANSFORM) as ITransform;

            // GEOMETRY STUFF
            const model: IRenderModel|undefined = this.renderModelManager.GetModel(vc.modelId);

            if(model === undefined){ return; }

            const positionBuffer = gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);            

            gl.bufferData(gl.ARRAY_BUFFER,
                new Float32Array(model.vertices),
                gl.STATIC_DRAW);

            const buffers = {
                position: positionBuffer
            }

            // SHADER STUFF
            const { fragmentShaderId, vertexShaderId } = vc.shaders;
            const programInfo = this.shaderProgramManager.initShaderProgram(gl, vertexShaderId, fragmentShaderId );

            if(programInfo === null){ return; }

            // Set the drawing position to the "identity" point, which is
            // the center of the scene.
            const modelViewMatrix = mat4.create();

            // Now move the drawing position a bit to where we want to
            // start drawing the square.
            const {x,y,z} = tc.position;
            mat4.translate(modelViewMatrix,     // destination matrix
                modelViewMatrix,     // matrix to translate
                [-x, y, -z]);  // amount to translate

            // Tell WebGL how to pull out the positions from the position
            // buffer into the vertexPosition attribute.
            {
                const numComponents = 2;  // pull out 2 values per iteration
                const type = gl.FLOAT;    // the data in the buffer is 32bit floats
                const normalize = false;  // don't normalize
                const stride = 0;         // how many bytes to get from one set of values to the next
                // 0 = use type and numComponents above
                const offset = 0;         // how many bytes inside the buffer to start from
                gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
                gl.vertexAttribPointer(
                    programInfo.attribLocations.vertexPosition,
                    numComponents,
                    type,
                    normalize,
                    stride,
                    offset);
                gl.enableVertexAttribArray(
                    programInfo.attribLocations.vertexPosition);
            }

            // Tell WebGL to use our program when drawing
            gl.useProgram(programInfo.program);

            // Set the shader uniforms
            gl.uniformMatrix4fv(
                programInfo.uniformLocations.projectionMatrix,
                false,
                projectionMatrix);
            gl.uniformMatrix4fv(
                programInfo.uniformLocations.modelViewMatrix,
                false,
                modelViewMatrix);

            {
                const offset = 0;
                const vertexCount = 4;
                gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
            }

        })
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

            const ctx: WebGLRenderingContext | null = this.canvas.getContext("webgl")
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

        this.initRenderingContext()
    }

    private initRenderingContext() {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
}