import { ComponentType, IComponent } from "../Components";

export default class Entity{
    
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

    private registerComponents(components:IComponent[]){
        components.forEach(c => {
            this.components.set(c.componentType, c);
        })
    }
}