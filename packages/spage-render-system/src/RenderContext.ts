export default class RenderContext {

    private canvas: HTMLCanvasElement;
    private gl: WebGL2RenderingContext;

    private initialized: boolean;

    public init() {
        
        this.initialized = false;

        const canv = document.getElementById('glCanvas') as HTMLCanvasElement;

        if (canv != null) {
            this.canvas = canv;

            const ctx: WebGL2RenderingContext | null = this.canvas.getContext("webgl2")
            if (ctx !== null) {
                this.gl = ctx;
                this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
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

        this.initialized = true;
    }

    public getContext() : WebGL2RenderingContext {
        return this.gl;
    }

    public isInitialized() : boolean {
        return this.initialized;
    }


}