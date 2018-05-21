import { ComponentType, IVisible } from "./interfaces";

export default class VisibleComponent implements IVisible
{
    public componentId: string;
    public componentType: ComponentType = ComponentType.VISIBLE;
    
    public modelId: string;
    public textureId: string;
    public color: string;
}