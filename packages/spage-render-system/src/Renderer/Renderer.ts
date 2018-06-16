import { mat4, vec4 } from "gl-matrix";

import { IModelEntity, IRenderEntityBase } from "../RenderEntity";
import RenderContext from "./RenderContext";

import { GeometryManager, MaterialManager } from '../ResourceManager';
import SceneManager from "../SceneManager";
import Utils  from "../Utilities";

export default class Renderer {

    private renderContext: RenderContext
    private renderModelManager: GeometryManager;
    private materialManager: MaterialManager;
    private SceneManager: SceneManager;

    constructor() {
        this.renderContext = new RenderContext();
        this.renderModelManager = new GeometryManager();
        this.materialManager = new MaterialManager();
        this.SceneManager = new SceneManager();
    }

    public init(canvasElement:HTMLCanvasElement) {
        this.renderContext.init(canvasElement);
        return this.renderContext.isInitialized();
    }



    // TODO: Need to split this function
    public render() {
        const gl = this.renderContext.getContext();

        this.preRender(gl);

        this.SceneManager.getRenderQueue().forEach((entity: IModelEntity) => {
            const {shaderProgram} = entity.material;

            gl.useProgram(shaderProgram.program);


            const geometry = entity.geometry; 

            gl.bindBuffer(gl.ARRAY_BUFFER, entity.positionBuffer);

            gl.bufferData(
                gl.ARRAY_BUFFER,
                new Float32Array(geometry.vertices),
                gl.STATIC_DRAW);

            gl.bindVertexArray(geometry.vao);

            const positionAttributeLocation = shaderProgram.attributeLocations.get('a_VertexPosition');

            if (positionAttributeLocation === undefined) {
                console.log('RenderSystem.render: some attribute locations are undefined')
                return;
            }

            gl.enableVertexAttribArray(positionAttributeLocation);

            const size = geometry.vertexSize;          // 2 components per iteration
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
            mat4.rotate(mvMat, mvMat, Utils.degToRad(entity.direction[0]), [1, 0, 0]);
            mat4.rotate(mvMat, mvMat, Utils.degToRad(entity.direction[1]), [0, 1, 0]);
            mat4.rotate(mvMat, mvMat, Utils.degToRad(entity.direction[2]), [0, 0, 1]);
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
            const count = geometry.vertexCount;
            gl.drawArrays(primitiveType, offset2, count);
        });
    }

    public registerModelEntity(entityBase: IRenderEntityBase, color:vec4, geometryId:number, materialId:number) {
        const gl = this.renderContext.getContext();

        const material = this.materialManager.registerMaterial(gl, materialId);
        const geometry = this.renderModelManager.registerGeometry(gl, geometryId);
        const positionBuffer = gl.createBuffer();

        if(material === undefined || geometry === undefined || positionBuffer === null) { return };

        const entity: IModelEntity = {
            ...entityBase,
            color,
            geometry,
            material,
            positionBuffer,
        }

        this.SceneManager.registerRenderEntitiy(entity);
    }

    private preRender(gl:WebGL2RenderingContext) {
        // Clear the canvas
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
}