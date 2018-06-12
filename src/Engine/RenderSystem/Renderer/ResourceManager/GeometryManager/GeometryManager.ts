import { CubeGeometry, IGeometry, TestGeometry } from './Geometry'

export default class RenderModelService{

    private Models: Map<number,IGeometry>;
    constructor(){
        this.Models = new Map<number,IGeometry>();
    }

    public registerModel(gl:WebGL2RenderingContext, modelId:number): IGeometry|undefined {

        if(this.Models.has(modelId)) { return this.getModel(modelId); }

        switch(modelId) {
            case 1:{
                const cubeModel = new CubeGeometry(modelId, gl.createVertexArray());
                this.Models.set(modelId,cubeModel)
                return cubeModel;
            }
            case 2: {
                const testModel = new TestGeometry(modelId, gl.createVertexArray())
                this.Models.set(modelId,testModel)
                return testModel;
            }
        }

        return undefined;
    }

    public getModel(id:number):IGeometry|undefined{
        return this.Models.get(id);
    }
}