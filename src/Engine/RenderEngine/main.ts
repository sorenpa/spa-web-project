import * as Rx from 'rxjs';

import { IGameObjectEvent } from '../GameObejctService/interfaces';
import IGameObjectRenderData from '../GameObjects/interfaces';
import IRenderModel from './RenderModels/IRenderModel';
import RenderModelService from './RenderModels/ModelService';


/*
    This class is meant to handle the rendering of the game
*/
export default class Rendering  {

    

    public canvas: HTMLCanvasElement;
    private loop$: Rx.Observable<number>;

    private renderModelService: RenderModelService;
    private sceneGraph: IGameObjectRenderData[];

    constructor(loop$:Rx.Observable<number>, gameObject$: Rx.Observable<IGameObjectEvent>, renderModelService: RenderModelService){
        this.loop$ = loop$;
        gameObject$.subscribe(this.onGameObjectEvent.bind(this));

        this.sceneGraph = new Array<IGameObjectRenderData>();
        this.renderModelService = renderModelService;
    }
    
    public start(){
        this.initCanvas();
        this.loop$.subscribe(this.render.bind(this))
    }

    private onGameObjectEvent(event:IGameObjectEvent){
        console.log('Adding new render data')
        this.sceneGraph.push(event.renderData);
    }

    private initCanvas(){
        const canv = document.getElementById('glCanvas') as HTMLCanvasElement;
        
        if(canv != null){
            this.canvas = canv;
        }
    }

    private clearCanvas(){
        this.useCanvasContext( (ctx) => {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        })
    }

    private render(frameNumber: number) {
        console.log('Frame:', frameNumber, "x:");
        this.clearCanvas();

        this.sceneGraph.forEach(elem => {
            const ctx: CanvasRenderingContext2D|null = this.canvas.getContext("2d")
            if(ctx != null)
            {
                const model: IRenderModel|undefined = this.renderModelService.GetModel(elem.renderModelId);    
                if(model !== undefined){
                    model.renderFunction(ctx, elem.translation, elem.scale, elem.color);
                }
                
            }    
        })
        
    }

    private useCanvasContext(drawingFunc: (context:CanvasRenderingContext2D) => void){
        const ctx: CanvasRenderingContext2D|null = this.canvas.getContext("2d")
        if(ctx != null)
        {
            drawingFunc(ctx);
        }

        return null;
    }
}