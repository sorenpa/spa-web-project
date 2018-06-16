const VERT_BUFF_MAX: number = 16;
const SHADER_MAX: number = 16;

export default class RenderContext {

    private canvas: HTMLCanvasElement;
    private gl: WebGL2RenderingContext;

    private currentVertexBufferIndex: number | undefined;
    private vertexBuffers: WebGLBuffer[];

    private currentShaderIndex: number | undefined;
    private shaders: WebGLShader[];

    private initialized: boolean;

    public init(canvasElement: HTMLCanvasElement): boolean {

        this.initialized = false;

        if (canvasElement != null) {
            this.canvas = canvasElement;

            const ctx: WebGL2RenderingContext | null = this.canvas.getContext("webgl2")
            if (ctx !== null) {
                this.gl = ctx;
                this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

                this.currentVertexBufferIndex = undefined;
                this.vertexBuffers = new Array<WebGLBuffer>();

                this.currentShaderIndex = undefined;
                this.shaders = new Array<WebGLShader>();

                this.initialized = true;
                return true;
            }
            else {
                alert("Unable to initialize WebGL. Your browser or machine may not support it.");
                this.initialized = false;
                return false;
            }
        }
        else {
            alert("Unable to initialize WebGL. Your browser or machine may not support it.");
            this.initialized = false;
            return false;
        }
    }

    public getContext(): WebGL2RenderingContext {
        return this.gl;
    }

    public isInitialized(): boolean {
        return this.initialized;
    }

    public createVertexBuffer(): number | undefined {

        if (this.vertexBuffers.length > VERT_BUFF_MAX) { return undefined } // TODO error log

        const buffer: WebGLBuffer | null = this.gl.createBuffer();

        if (buffer === null) { return undefined; } // TODO log error

        return this.vertexBuffers.push(buffer) - 1;
    }

    public setVertexBuffer(vertexBufferIndex: number) : number|undefined {
        if (vertexBufferIndex < 0 || vertexBufferIndex > VERT_BUFF_MAX) { return undefined; }

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffers[vertexBufferIndex]);
        this.currentVertexBufferIndex = vertexBufferIndex;
        return this.currentVertexBufferIndex;
    }

    public getCurrentVertexBufferIndex(): number|undefined {
        return this.currentVertexBufferIndex;
    }

    public registerShaderProgram(program:WebGLShader): number|undefined{
        if (this.shaders.length > VERT_BUFF_MAX) { return undefined } // TODO error log

        return this.shaders.push(program) - 1;
    }

    // TODO: At some point this needs to be refactored into set
    public setShader(shaderIndex: number) : number|undefined {
        if (shaderIndex < 0 || shaderIndex > SHADER_MAX) { return undefined; }

        this.gl.useProgram(this.shaders[shaderIndex]);
        this.currentShaderIndex = shaderIndex;
        return this.currentShaderIndex;
    }

    public getCurrentShaderIndex(): number|undefined {
        return this.currentShaderIndex;
    }

}