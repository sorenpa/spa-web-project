declare module "spage-logging-system" {
    export class LogLabel {
        public name: string;
        public subLabel: LogLabel|undefined;
    
        constructor(label:string, ...subLabels:string[]);
    
        public setSubLabels(...subLabels:string[]):void;
    }

    export class Log {
        public static info(labels:LogLabel, message:any, ...optional:any[]):void;
        public static warn(labels:LogLabel, message:any, ...optional:any[]):void;
        public static error(labels:LogLabel, error:Error, ...optional:any[]):void;
    } 

    enum ModuleLabel{
        CORE = 'spage-engine-core',
        EVENT = 'spage-event-system',
        INPUT = 'spage-input-system',
        LOGGING = 'spage-logging-system',
        PHYSICS = 'spage-physics-system',
        FRONTEND = 'spage-react-frontend',
        RENDERER = 'spage-render-system',
    }
}
