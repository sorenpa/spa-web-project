import { CubeGeometry, Geometry, TestGeometry } from './Geometry'

export default class RenderModelService{

    private Models: Map<number,Geometry>;
    constructor(){
        this.Models = new Map<number,Geometry>();
    }

    public registerModel(gl:WebGL2RenderingContext, modelId:number): number {

        if(this.Models.has(modelId)) { return modelId; }

        switch(modelId) {
            case 1:{
                this.Models.set(modelId,new CubeGeometry(gl.createVertexArray()))
                return 1;
            }
            case 2: {
                this.Models.set(modelId,new TestGeometry(gl.createVertexArray()))
                return 2;
            }
        }

        return 0;
    }

    public getModel(id:number):Geometry|undefined{
        return this.Models.get(id);
    }
}