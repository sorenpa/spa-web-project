const BASE_CSS: string = 'color:black'

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

export function log(type:LogEntryType, entryModule:LogEntryModule, message:any, ...optional:any[]) {
    const moduleCss: string = 'color:' + getModuleColor(entryModule);

    const dateString = new Date().toLocaleTimeString()
    const typeString = " [" + type + "]";
    const moduleString = "%c <" + entryModule + ">" + "%c: ";

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

function getModuleColor(entryModule: LogEntryModule): string {
    let moduleColor: string = 'black'
    switch (entryModule) {
        case LogEntryModule.CORE:
            moduleColor = '#1ab2ff'
            break;
        case LogEntryModule.EVENT:
            moduleColor = '#8787de'
            break;
        case LogEntryModule.RENDERER:
            moduleColor = '#00cca3'
            break;
        case LogEntryModule.PHYSICS:
            moduleColor = '#ff9955'
            break;
        case LogEntryModule.FRONTEND:
            moduleColor = '#5599ff'
            break;
        case LogEntryModule.INPUT:
            moduleColor = '#d3bc5f'
            break;
    }

    return moduleColor
}



