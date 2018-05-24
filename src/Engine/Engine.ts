import { fromEvent, interval, merge, Observable, Subject } from 'rxjs';

import { IGameObjectEvent } from './EventSystem';
import RenderSystem from './RenderSystem';

import { ComponentType, Entity, EntityManager, IComponent, IMovable, IPhysics, IPlayer, IVisible } from './ComponentSystem';
import InputSystem from './InputSystem/InputSystem';
import PhysicsSystem from './PhysicsSystem/PysicsSystem';


const LOOP_INTERVAL = 16;

// Streams
const gameloop$ : Observable<number> = interval(LOOP_INTERVAL);

const gameObjectUpdates$ : Subject<IGameObjectEvent> = new Subject<IGameObjectEvent>()
// const gameObjectActions$ : Rx.Observable<IGameObjectActionEvent>
// const gameLogicUpdates$ : Rx.Observable<GameLogicUpdateEvent>

const keydown$ : Observable<Event> = fromEvent(document,'keydown');
const keyup$ : Observable<Event> = fromEvent(document,'keyup');
const keyboardInput$ : Observable<Event> = merge(keydown$, keyup$);

const inputSystem: InputSystem = new InputSystem(gameObjectUpdates$, keyboardInput$);
const renderSystem: RenderSystem = new RenderSystem(gameObjectUpdates$);
const entityManager: EntityManager = new EntityManager(gameObjectUpdates$);
const physicsSystem: PhysicsSystem = new PhysicsSystem(gameObjectUpdates$);
// const EventStreamManager

export default function boot(){
  
    renderSystem.start();
    physicsSystem.start();
    inputSystem.start();
    
    gameloop$.subscribe(gameLoop);

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
        position: {x: 250, y:200, z:0},
        scale: {x: 1, y:1, z:1 }
    }

    const mc1: IMovable = {
        acceleration: {x:0.1,y:0.1,z:0.5},
        componentId: 'C3',
        componentType: ComponentType.MOVABLE,
        maxSpeed: 3,
        velocity: {x:0,y:0,z:0}
    }

    const playerComp: IPlayer = {
        componentId: 'C6',
        componentType: ComponentType.PLAYER,
        playerName: 'Huggo'
    }

    const components1: IComponent[] = [vc1,pc1,mc1, playerComp];
    
    const entity1: Entity = new Entity('E1', components1);

    const vc2: IVisible = {
        color: '#A38',
        componentId: 'C4',
        componentType: ComponentType.VISIBLE,
        modelId: 'rectangle',
        textureId: 'none',
    }

    const pc2: IPhysics = {
        componentId: 'C5',
        componentType: ComponentType.PHYSICS,
        direction: {x: 0, y:0, z:0},
        position: {x: 200, y:300, z:0},
        scale: {x: 2, y:2, z:1 }
    }

    const components2: IComponent[] = [vc2,pc2];
    
    const entity2: Entity = new Entity('E2', components2);

    entityManager.AddGameObject(entity1);
    entityManager.AddGameObject(entity2);
}

function gameLoop(frame: number){
    inputSystem.update();
    physicsSystem.update();
    renderSystem.render();

}