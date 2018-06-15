import {IEntityEvent} from 'spage-event-system';

declare module "spage-render-system" {
    export default class RenderSystem {
        constructor(); 
        public init():boolean;
        public render():void;
    }
}



