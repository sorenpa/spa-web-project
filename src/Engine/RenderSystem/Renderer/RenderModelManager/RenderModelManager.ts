import { CubeModel, RenderModel, TestModel } from './Models'

export default class RenderModelService{

    private Models: Map<number,RenderModel>;
    constructor(){
        this.Models = new Map<number,RenderModel>();
    }

    public registerModel(gl:WebGL2RenderingContext, modelId:number): number {

        if(this.Models.has(modelId)) { return modelId; }

        switch(modelId) {
            case 1:{
                this.Models.set(modelId,new CubeModel(gl.createVertexArray()))
                return 1;
            }
            case 2: {
                this.Models.set(modelId,new TestModel(gl.createVertexArray()))
                return 2;
            }
        }

        return 0;
    }

    public getModel(id:number):RenderModel|undefined{
        return this.Models.get(id);
    }
}