import { interval, Observable, Subject } from 'rxjs';

import GameObjectService from './GameObejctService';
import { IGameObjectEvent } from './GameObejctService/interfaces';
import Rectangle from './GameObjects/Rectangle';

import RenderEngine from './RenderEngine';
import RenderModelService from './RenderEngine/RenderModels/ModelService';

const LOOP_INTERVAL = 1000;

// Streams
const gameloop$ : Observable<number> = interval(LOOP_INTERVAL);

const gameObjectUpdates$ : Subject<IGameObjectEvent> = new Subject<IGameObjectEvent>()
// const gameObjectActions$ : Rx.Observable<IGameObjectActionEvent>
// const gameLogicUpdates$ : Rx.Observable<GameLogicUpdateEvent>
// const userInputs$ : Rx.Observable<IUserInputEvent>
// const PhysicsUpdates$ : Rx.Observable<IPhysicsUpdateEvent>

const renderModelService: RenderModelService = new RenderModelService();
const renderEngine: RenderEngine = new RenderEngine(gameloop$, gameObjectUpdates$, renderModelService);
const gameObjectService: GameObjectService = new GameObjectService(gameObjectUpdates$);
// const StreamControlService

export default function boot(){
  
    renderEngine.start();

    gameObjectUpdates$.subscribe(x => console.log(x));

    const newGo:Rectangle = new Rectangle('Rect1',
        {
            color: '#f33',
            renderModelId: 'rectangle',
            renderTextureId: 'xxx',
            rotation: {x:0,y:0,z:0},
            scale: {x:1,y:1,z:1},
            translation: {x:25,y:50,z:0},
        });

    const newGo2:Rectangle = new Rectangle('Rect1',
        {
            color: '#A3B',
            renderModelId: 'rectangle',
            renderTextureId: 'xxx',
            rotation: {x:0,y:0,z:0},
            scale: {x:1,y:1,z:1},
            translation: {x:300,y:230,z:0},
        });

    gameObjectService.AddGameObject(newGo);
    gameObjectService.AddGameObject(newGo2);
}