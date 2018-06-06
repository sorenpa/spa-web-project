import { mat4 } from "gl-matrix";
import RenderContext from "./RenderContext";
import RenderModelManager, {RenderModel} from "./RenderModelManager";
import ShaderProgramManager, { IShaderPair, IShaderProgram } from "./ShaderProgramManager";
import { degToRad } from "./Utilities/webGlUtils";

import { ComponentType, Entity, ITransform, IVisible } from "../../ComponentSystem"; // TODO: We need to get rid of this coupling

export default class Renderer {

    private renderContext: RenderContext

    private sceneEntities: Map<string, Map<string, Entity[]>>;

    private renderModelManager: RenderModelManager;
    private shaderProgramManager: ShaderProgramManager;

    constructor() {
        this.sceneEntities = new Map<string, Map<string, Entity[]>>();
        this.renderContext = new RenderContext();
        this.renderModelManager = new RenderModelManager();
        this.shaderProgramManager = new ShaderProgramManager();
    }

    public init() {
        this.renderContext.init();
        return this.renderContext.isInitialized();
    }

    // TODO: Need to split this function
    public render() {
        const gl = this.renderContext.getContext();

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

                    gl.bufferData(
                        gl.ARRAY_BUFFER,
                        new Float32Array(model.vertices),
                        gl.STATIC_DRAW);

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
    }

    public registerEntity(entity:Entity) {
        const gl = this.renderContext.getContext();

        const visibleComponent = entity.getCompoenent(ComponentType.VISIBLE) as IVisible;

            const shaderPair: IShaderPair = { ...visibleComponent.shaders };
            const programId: string = this.shaderProgramManager.registerShader(gl, shaderPair);

            // TODO: Register the model and bind VAO, perhaps create a buffer for the entity ?
            this.renderModelManager.registerModel(gl, visibleComponent.modelId);

            const model = this.renderModelManager.getModel(visibleComponent.modelId);

            if (model === undefined) { return; }

            const positionBuffer = gl.createBuffer();
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