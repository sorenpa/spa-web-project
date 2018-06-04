import { CubeModel, RenderModel, TestModel } from './Models'

export default class RenderModelService{

    private Models: Map<string,RenderModel>;
    constructor(){
        this.Models = new Map<string,RenderModel>();
    }

    public registerModel(gl:WebGL2RenderingContext, modelId:string) {

        if(this.Models.has(modelId)) { return; }

        switch(modelId) {
            case 'Cube':{
                this.Models.set(modelId,new CubeModel(gl.createVertexArray()))
                break;
            }
            case 'Test': {
                this.Models.set(modelId,new TestModel(gl.createVertexArray()))
                break;
            }
        }
    }

    public getModel(id:string):RenderModel|undefined{
        return this.Models.get(id);
    }
}