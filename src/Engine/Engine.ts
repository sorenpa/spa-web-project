import { vec3, vec4 } from 'gl-matrix';
import { entity$, gameloop$, keyboardInput$ } from './EventSystem';
import RenderSystem from './RenderSystem';

import { ComponentType, Entity, EntityManager, IComponent, IMovable, IPlayer, ITransform, IVisible } from './ComponentSystem';
import InputSystem from './InputSystem/InputSystem';
import PhysicsSystem from './PhysicsSystem/PysicsSystem';



const inputSystem: InputSystem = new InputSystem(entity$, keyboardInput$);
const renderSystem: RenderSystem = new RenderSystem(entity$);
const entityManager: EntityManager = new EntityManager(entity$);
const physicsSystem: PhysicsSystem = new PhysicsSystem(entity$);

export default function boot(): boolean{
    let initSuccess = true;

    if(!renderSystem.init()) { initSuccess = false;};
    if(!physicsSystem.init()) {initSuccess = false;};
    if(!inputSystem.init()) {initSuccess = false;};
    
    if(initSuccess) {
        gameloop$.subscribe(gameLoop);
        addTestObjects()    
    }

    return true;
}

function gameLoop(frame: number){
    inputSystem.update();
    physicsSystem.update();
    renderSystem.render();
}

function addTestObjects(){

    const vc1: IVisible = {
        color: vec4.fromValues(1.0, 0.0, 0.0, 1.0),
        componentId: 'C1',
        componentType: ComponentType.VISIBLE,
        modelId: 'Cube',
        positionBufffer: null,
        shaders: {
            fragmentShaderId: 'fragmentBase',
            vertexShaderId: 'vertexBase'
        },
        textureId: 'none',
    }

    const tc1: ITransform = {
        componentId: 'C2',
        componentType: ComponentType.TRANSFORM,
        direction: vec3.fromValues(50.0, 23.0, 10.0),
        position: vec3.fromValues(300,200,0),
        scale: vec3.fromValues(50.0, 50.0, 50.0),
    }

    const mc1: IMovable = {
        acceleration: vec3.fromValues(1.0, 1.0, 1.0),
        componentId: 'C3',
        componentType: ComponentType.MOVABLE,
        maxSpeed: 3,
        velocity: vec3.fromValues(0.0, 0.0, 0.0)
    }

    const playerComp: IPlayer = {
        componentId: 'C6',
        componentType: ComponentType.PLAYER,
        playerName: 'Huggo'
    }

    const components1: IComponent[] = [vc1,tc1,mc1, playerComp];
    
    const entity1: Entity = new Entity('E1', components1);

    const vc2: IVisible = {
        color: vec4.fromValues(1.0, 0.0, 5.0, 1.0),
        componentId: 'C4',
        componentType: ComponentType.VISIBLE,
        modelId: 'Test',
        positionBufffer: null,
        shaders: {
            fragmentShaderId: 'fragmentBase',
            vertexShaderId: 'vertexBase'
        },
        textureId: 'none',
    }

    const tc2: ITransform = {
        componentId: 'C5',
        componentType: ComponentType.TRANSFORM,
        direction: vec3.fromValues(0.0, 0.0, 0.0),
        position: vec3.fromValues(0.0, 0.0, 0.0),
        scale: vec3.fromValues(1.0, 1.0, 1.0),
    }

    const components2: IComponent[] = [vc2,tc2];
    
    const entity2: Entity = new Entity('E2', components2);

    entityManager.AddGameObject(entity1);
    entityManager.AddGameObject(entity2);
}