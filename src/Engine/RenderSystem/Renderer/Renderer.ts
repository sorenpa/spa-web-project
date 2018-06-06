import { mat4 } from "gl-matrix";
import RenderContext from "./RenderContext";
import RenderModelManager, { RenderModel } from "./RenderModelManager";
import ShaderProgramManager, { IShaderProgram } from "./ShaderProgramManager";
import { degToRad } from "./Utilities/webGlUtils";

import RenderEntity from "./RenderEntity";

export default class Renderer {

    private renderContext: RenderContext

    private sceneEntities: Map<number, Map<number, RenderEntity[]>>;

    private renderModelManager: RenderModelManager;
    private shaderProgramManager: ShaderProgramManager;

    constructor() {
        this.sceneEntities = new Map<number, Map<number, RenderEntity[]>>();
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

                    gl.bindBuffer(gl.ARRAY_BUFFER, entity.positionBufffer);

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
                    mat4.translate(mvMat, mvMat, entity.position);
                    mat4.rotate(mvMat, mvMat, degToRad(entity.direction[0]), [1, 0, 0]);
                    mat4.rotate(mvMat, mvMat, degToRad(entity.direction[1]), [0, 1, 0]);
                    mat4.rotate(mvMat, mvMat, degToRad(entity.direction[2]), [0, 0, 1]);
                    mat4.scale(mvMat, mvMat, entity.scale);
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
                    gl.uniform4f(colorLocation, entity.color[0], entity.color[1], entity.color[2], entity.color[3]);

                    const primitiveType = gl.TRIANGLES;
                    const offset2 = 0;
                    const count = model.vertexCount;
                    gl.drawArrays(primitiveType, offset2, count);
                })
            })
        });
    }

    public registerEntity(entity:RenderEntity) {
        const gl = this.renderContext.getContext();

        const programId: number = this.shaderProgramManager.registerShader(gl, entity.shaders);

        // TODO: Register the model and bind VAO, perhaps create a buffer for the entity ?
        this.renderModelManager.registerModel(gl, entity.modelId);

        const model = this.renderModelManager.getModel(entity.modelId);

        if (model === undefined) { return; }

        const positionBuffer = gl.createBuffer();
        if (positionBuffer === null) { return; }
        entity.positionBufffer = positionBuffer;

        console.log('RENDER: Adding entity to scenegraph', entity);
        let modelMap: Map<number, RenderEntity[]> | undefined = this.sceneEntities.get(programId);

        if (modelMap === undefined) {
            modelMap = new Map<number, RenderEntity[]>();
            this.sceneEntities.set(programId, modelMap);
        }

        let entityArray: RenderEntity[] | undefined = modelMap.get(entity.modelId);

        if (entityArray === undefined) {
            entityArray = new Array<RenderEntity>();
            modelMap.set(entity.modelId, entityArray);
        }
        
        entityArray.push(entity);
    }
}