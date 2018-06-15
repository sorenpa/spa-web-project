import { ComponentType,  IComponent, IEntity } from "spage-shared-interfaces";

export default class Entity implements IEntity{ // TODO implement IEntity from lib
    
    protected entityId: number;
    protected components: Map<ComponentType,IComponent>;

    constructor(entityId:number, components:IComponent[])
    {
        this.entityId = entityId;
        this.components = new Map<ComponentType,IComponent>();

        this.registerComponents(components);
    }

    public getEntityId(): number {
        return this.entityId;
    }

    public getComponentKey(): number {
        let key: number = 0b0;

        this.components.forEach(c => {
            key = key | c.componentType;
        })

        return key;
    }

    public getCompoenent(type:ComponentType): IComponent|undefined {
        return this.components.get(type);
    }

    public registerComponents(components:IComponent[]){
        components.forEach(c => {
            this.components.set(c.componentType, c);
        })
    }
}