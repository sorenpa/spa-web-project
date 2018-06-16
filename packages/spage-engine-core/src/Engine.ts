import { vec3, vec4 } from 'gl-matrix';

import { ComponentType, IComponent, IMovable, IPlayer, ITransform, IVisible } from 'spage-shared-interfaces';
import EntityManager, { Entity } from './EntityManager'

import { gameloop$ } from 'spage-event-system';
import InputSystem from 'spage-input-system';
import PhysicsSystem from 'spage-physics-system';
import RenderSystem from 'spage-render-system';

const inputSystem: InputSystem = new InputSystem();
const renderSystem: RenderSystem = new RenderSystem();
const entityManager: EntityManager = new EntityManager();
const physicsSystem: PhysicsSystem = new PhysicsSystem();

export default function boot(canvasElement:HTMLCanvasElement): boolean{
    let initSuccess = true;

    if(!renderSystem.init(canvasElement)) { initSuccess = false;};
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
        componentId: 1,
        componentType: ComponentType.VISIBLE,
        materialId: 1,
        modelId: 1,
    }

    const tc1: ITransform = {
        componentId: 2,
        componentType: ComponentType.TRANSFORM,
        direction: vec3.fromValues(50.0, 23.0, 10.0),
        position: vec3.fromValues(300,200,0),
        scale: vec3.fromValues(50.0, 50.0, 50.0),
    }

    const mc1: IMovable = {
        acceleration: vec3.fromValues(0.05, 0.05, 0.05),
        componentId: 3,
        componentType: ComponentType.MOVABLE,
        deltaVelocity: vec3.fromValues(0.0, 0.0, 0.0),
        maxSpeed: 3,
        velocity: vec3.fromValues(1.0, 1.0, 0.0)
    }

    const playerComp: IPlayer = {
        componentId: 6,
        componentType: ComponentType.PLAYER,
        playerName: 'Huggo'
    }

    const components1: IComponent[] = [vc1,tc1,mc1, playerComp];
    
    const entity1: Entity = new Entity(1, components1);

    const vc2: IVisible = {
        color: vec4.fromValues(1.0, 0.0, 5.0, 1.0),
        componentId: 4,
        componentType: ComponentType.VISIBLE,
        materialId: 1,
        modelId: 2,
    }

    const mc2: IMovable = {
        acceleration: vec3.fromValues(0.05, 0.05, 0.05),
        componentId: 3,
        componentType: ComponentType.MOVABLE,
        deltaVelocity: vec3.fromValues(0.0, 0.0, 0.0),
        maxSpeed: 3,
        velocity: vec3.fromValues(7.0, 5.0, 0.0)
    }

    const tc2: ITransform = {
        componentId: 5,
        componentType: ComponentType.TRANSFORM,
        direction: vec3.fromValues(0.0, 0.0, 0.0),
        position: vec3.fromValues(0.0, 0.0, 0.0),
        scale: vec3.fromValues(1.0, 1.0, 1.0),
    }

    const components2: IComponent[] = [vc2,tc2,mc2];
    
    const entity2: Entity = new Entity(2, components2);

    entityManager.AddEntity(entity1);
    entityManager.AddEntity(entity2);
}