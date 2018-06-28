import {LogLabel} from './LogLabel'

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

function getlabelCss(label: LogLabel): string {
    let labelCss: string = ''
    switch (label.name) {
        case ModuleLabel.CORE:
            labelCss = 'background:#5599ff; color:black'
            break;
        case ModuleLabel.EVENT:
            labelCss = 'background:#9966ff; color:black'
            break;
        case ModuleLabel.RENDERER:
            labelCss = 'background:#70db70; color:black'
            break;
        case ModuleLabel.PHYSICS:
            labelCss = 'background:#ff9955; color:black'
            break;
        case ModuleLabel.FRONTEND:
            labelCss = 'background:#00e6e6; color:black'
            break;
        case ModuleLabel.INPUT:
            labelCss = 'background:#d3bc5f; color:black'
            break;
        case ModuleLabel.LOGGING:
            labelCss = 'background:#666699; color:black'
            break;
    }

    return labelCss
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
        const moduleCss: string = getlabelCss(label);
        const date = new Date();
        const dateString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `
        const typeString = "[" + type + "] ";
        const moduleString = "%c" + label.resolveString();
    
        switch (type) {
            case LogEntryType.INFO:
                console.info(dateString + typeString + moduleString, moduleCss, message, ...optional);
                return;
            case LogEntryType.WARNING:
                console.warn(dateString + typeString + moduleString, moduleCss, message, ...optional);
                return;
            case LogEntryType.ERROR:
                console.error(dateString + typeString + moduleString, moduleCss, message, ...optional);
                return;
            default:
                console.warn('Log received wrong type')
        }
    
    }
}





