import { interval, Observable, Subject } from 'rxjs';

import { IGameObjectEvent } from '../EventManager';
import EntityManager from './ComponentSystem/EntityManager';
import RenderEngine from './RenderSystem';

import Entity from './ComponentSystem/Components/Entity';
import { ComponentType, IComponent, IPhysics, IVisible } from './ComponentSystem/Components/interfaces';



const LOOP_INTERVAL = 1000;

// Streams
const gameloop$ : Observable<number> = interval(LOOP_INTERVAL);

const gameObjectUpdates$ : Subject<IGameObjectEvent> = new Subject<IGameObjectEvent>()
// const gameObjectActions$ : Rx.Observable<IGameObjectActionEvent>
// const gameLogicUpdates$ : Rx.Observable<GameLogicUpdateEvent>
// const userInputs$ : Rx.Observable<IUserInputEvent>
// const PhysicsUpdates$ : Rx.Observable<IPhysicsUpdateEvent>

const renderEngine: RenderEngine = new RenderEngine(gameloop$, gameObjectUpdates$);
const entityManager: EntityManager = new EntityManager(gameObjectUpdates$);
// const EventStreamManager

export default function boot(){
  
    renderEngine.start();

    gameObjectUpdates$.subscribe(x => console.log(x));

    const vc1: IVisible = {
        color: '#F33',
        componentId: 'C1',
        componentType: ComponentType.VISIBLE,
        modelId: 'rectangle',
        textureId: 'none',
        
    }

    const pc1: IPhysics = {
        componentId: 'C2',
        componentType: ComponentType.PHYSICS,
        direction: {x: 0, y:0, z:0},
        position: {x: 250, y:700, z:0},
        scale: {x: 1, y:1, z:1 }
    }

    const components1: IComponent[] = [vc1,pc1];
    
    const entity1: Entity = new Entity('E1', components1);

    const vc2: IVisible = {
        color: '#A38',
        componentId: 'C3',
        componentType: ComponentType.VISIBLE,
        modelId: 'rectangle',
        textureId: 'none',
    }

    const pc2: IPhysics = {
        componentId: 'C4',
        componentType: ComponentType.PHYSICS,
        direction: {x: 0, y:0, z:0},
        position: {x: 200, y:300, z:0},
        scale: {x: 2, y:2, z:1 }
    }

    const components2: IComponent[] = [vc2,pc2];
    
    const entity2: Entity = new Entity('E1', components2);

    entityManager.AddGameObject(entity1);
    entityManager.AddGameObject(entity2);
}