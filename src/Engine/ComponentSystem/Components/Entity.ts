import { ComponentType, IComponent } from "./interfaces";

export default class Entity{
    
    protected entityId: string;
    protected components: Map<ComponentType,IComponent>;

    constructor(entityId:string, components:IComponent[])
    {
        this.entityId = entityId;
        this.components = new Map<ComponentType,IComponent>();

        this.registerComponents(components);
    }

    public getEntityId(): string {
        return this.entityId;
    }

    public hasComponents(componentTypes:ComponentType[]):boolean {
        let result: boolean = true;
        componentTypes.forEach(ct => {
            if(!this.components.has(ct))
            {   
                result = false;
                return
            }
        })

        return result;
    }

    public getCompoenent(type:ComponentType): IComponent|undefined {
        return this.components.get(type);
    }

    private registerComponents(components:IComponent[]){
        components.forEach(c => {
            this.components.set(c.componentType, c);
        })
    }
}