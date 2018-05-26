import { gameloop$, gameObjectUpdates$, keyboardInput$ } from './EventSystem';
import RenderSystem from './RenderSystem';

import { ComponentType, Entity, EntityManager, IComponent, IMovable, IPlayer, ITransform, IVisible } from './ComponentSystem';
import InputSystem from './InputSystem/InputSystem';
import PhysicsSystem from './PhysicsSystem/PysicsSystem';

const inputSystem: InputSystem = new InputSystem(gameObjectUpdates$, keyboardInput$);
const renderSystem: RenderSystem = new RenderSystem(gameObjectUpdates$);
const entityManager: EntityManager = new EntityManager(gameObjectUpdates$);
const physicsSystem: PhysicsSystem = new PhysicsSystem(gameObjectUpdates$);

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

    const tc1: ITransform = {
        componentId: 'C2',
        componentType: ComponentType.TRANSFORM,
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

    const components1: IComponent[] = [vc1,tc1,mc1, playerComp];
    
    const entity1: Entity = new Entity('E1', components1);

    const vc2: IVisible = {
        color: '#A38',
        componentId: 'C4',
        componentType: ComponentType.VISIBLE,
        modelId: 'rectangle',
        textureId: 'none',
    }

    const tc2: ITransform = {
        componentId: 'C5',
        componentType: ComponentType.TRANSFORM,
        direction: {x: 0, y:0, z:0},
        position: {x: 200, y:300, z:0},
        scale: {x: 2, y:2, z:1 }
    }

    const components2: IComponent[] = [vc2,tc2];
    
    const entity2: Entity = new Entity('E2', components2);

    entityManager.AddGameObject(entity1);
    entityManager.AddGameObject(entity2);
}

function gameLoop(frame: number){
    inputSystem.update();
    physicsSystem.update();
    renderSystem.render();

}