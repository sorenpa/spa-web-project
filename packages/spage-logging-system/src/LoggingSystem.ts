import {LogLabel} from './LogLabel'
const BASE_CSS: string = 'color:black'

enum LogEntryType {
    INFO = 'INFO',
    WARNING = 'WARNING',
    ERROR = 'ERROR'
}

export enum ModuleLabel{
    CORE = 'spage-engine-core',
    EVENT = 'spage-event-system',
    INPUT = 'spage-input-system',
    LOGGING = 'spage-logging-system',
    PHYSICS = 'spage-physics-system',
    FRONTEND = 'spage-react-frontend',
    RENDERER = 'spage-render-system',
}

function getModuleColor(label: LogLabel): string {
    let labelColor: string = 'black'
    switch (label.name) {
        case ModuleLabel.CORE:
            labelColor = '#5599ff'
            break;
        case ModuleLabel.EVENT:
            labelColor = '#9966ff'
            break;
        case ModuleLabel.RENDERER:
            labelColor = '#70db70'
            break;
        case ModuleLabel.PHYSICS:
            labelColor = '#ff9955'
            break;
        case ModuleLabel.FRONTEND:
            labelColor = '#00e6e6'
            break;
        case ModuleLabel.INPUT:
            labelColor = '#d3bc5f'
            break;
        case ModuleLabel.LOGGING:
            labelColor = '#666699'
            break;
    }

    return labelColor
}

export class Log {
    
    public static info(labels:LogLabel, message:any, ...optional:any[]):void {
        this.log(LogEntryType.INFO, labels, message, ...optional)
    }

    public static warn(labels:LogLabel, message:any, ...optional:any[]):void {
        this.log(LogEntryType.WARNING, labels, message, ...optional)
    }
    
    public static error(labels:LogLabel, error:Error, ...optional:any[]):void {
        this.log(LogEntryType.ERROR, labels, error, ...optional)
    }
    
    private static log(type:LogEntryType, label:LogLabel, message:any, ...optional:any[]) {
        const moduleCss: string = 'background:' + getModuleColor(label);
    
        const date = new Date();
        const dateString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `
        const typeString = "[" + type + "] ";
        const moduleString = "%c" + label.resolveString() + "%c:";
    
        switch (type) {
            case LogEntryType.INFO:
                console.info(dateString + typeString + moduleString, moduleCss, BASE_CSS, message, ...optional);
                return;
            case LogEntryType.WARNING:
                console.warn(dateString + typeString + moduleString, moduleCss, BASE_CSS, message, ...optional);
                return;
            case LogEntryType.ERROR:
                console.error(dateString + typeString + moduleString, moduleCss, BASE_CSS, message, ...optional);
                return;
            default:
                console.warn('Log received wrong type')
        }
    
    }
}





