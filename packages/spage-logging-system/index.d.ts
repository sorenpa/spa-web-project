declare module "spage-logging-system" {
    export function log(type:LogEntryType, moduleName:LogEntryModule, message:any, ...optional:any[]): void;

    export enum LogEntryType {
        INFO = 'INFO',
        WARNING = 'WARNING',
        ERROR = 'ERROR'
    }
    
    export enum LogEntryModule{
        CORE = 'spage-engine-core',
        EVENT = 'spage-event-system',
        INPUT = 'spage-input-system',
        LOGGING = 'spage-logging-system',
        PHYSICS = 'spage-physics-system',
        FRONTEND = 'spage-react-frontend',
        RENDERER = 'spage-render-system',
    }
    
}
