import * as Rx from 'rxjs';

import { IGameObjectEvent } from '../../EventManager';

import Entity from '../ComponentSystem/Components/Entity';
import { ComponentType, IPhysics, IVisible } from '../ComponentSystem/Components/interfaces';
import RenderModelManager from './RenderModelManager';



/*
    This class is meant to handle the rendering of the game
*/
export default class RenderEngine  {

    public canvas: HTMLCanvasElement;
    private loop$: Rx.Observable<number>;

    private renderModelManager: RenderModelManager;
    private sceneGraph: Entity[];

    constructor(loop$:Rx.Observable<number>, gameObject$: Rx.Observable<IGameObjectEvent>){
        this.loop$ = loop$;
        gameObject$.subscribe(this.onGameObjectEvent.bind(this));

        this.sceneGraph = new Array<Entity>();
        this.renderModelManager = new RenderModelManager();
    }
    
    public start(){
        this.initCanvas();
        this.loop$.subscribe(this.render.bind(this))
    }

    private onGameObjectEvent(event:IGameObjectEvent){
        console.log('Adding new render data')
        if(event.entity.hasComponents([ComponentType.VISIBLE, ComponentType.PHYSICS])){
            this.sceneGraph.push(event.entity)
        }
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
        console.log('Frame:', frameNumber);
        this.clearCanvas();

        this.sceneGraph.forEach(elem => {
            const ctx: CanvasRenderingContext2D|null = this.canvas.getContext("2d")
            if(ctx != null)
            {
                console.log(elem)
                const vc: IVisible = elem.getCompoenent(ComponentType.VISIBLE) as IVisible;
                const pc: IPhysics = elem.getCompoenent(ComponentType.PHYSICS) as IPhysics;
                
                this.renderModelManager.drawModel(ctx,vc, pc);
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