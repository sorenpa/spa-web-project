import * as Rx from 'rxjs';
import RenderEngine from './RenderEngine'
import RenderModelService from './RenderEngine/RenderModels/ModelService';

const LOOP_INTERVAL = 1000;

// Streams
const gameloop$ : Rx.Observable<number> = Rx.interval(LOOP_INTERVAL);

const renderModelService: RenderModelService = new RenderModelService();
const renderEngine: RenderEngine = new RenderEngine(gameloop$, renderModelService);

export default function boot(){
    renderEngine.start();
}