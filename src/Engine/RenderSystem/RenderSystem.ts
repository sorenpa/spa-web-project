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

    private renderModelManager: RenderModelManager;
    private sceneGraph: Entity[];

    constructor(gameObject$: Rx.Observable<IGameObjectEvent>){
        gameObject$.subscribe(this.onGameObjectEvent.bind(this));

        this.sceneGraph = new Array<Entity>();
        this.renderModelManager = new RenderModelManager();
    }
    
    public start(){
        this.initCanvas();
    }

    public render() {
        this.clearCanvas();

        this.sceneGraph.forEach(elem => {
            const ctx: CanvasRenderingContext2D|null = this.canvas.getContext("2d")
            if(ctx != null)
            {
                const vc: IVisible = elem.getCompoenent(ComponentType.VISIBLE) as IVisible;
                const pc: IPhysics = elem.getCompoenent(ComponentType.PHYSICS) as IPhysics;
                
                this.renderModelManager.drawModel(ctx,vc, pc);
            }    
        })
    }

    private onGameObjectEvent(event:IGameObjectEvent){
        if(event.entity.hasComponents([ComponentType.VISIBLE, ComponentType.PHYSICS])){
            console.log('RENDER: Adding entity to scenegraph', event.entity);
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

    private useCanvasContext(drawingFunc: (context:CanvasRenderingContext2D) => void){
        const ctx: CanvasRenderingContext2D|null = this.canvas.getContext("2d")
        if(ctx != null)
        {
            drawingFunc(ctx);
        }

        return null;
    }
}