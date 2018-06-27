

export class LogLabel {
    public name: string;
    public subLabel: LogLabel|undefined;

    constructor(label:string, ...subLabels:string[]){
        this.name = label;
        if(subLabels !== undefined && subLabels.length > 0){
            this.subLabel = new LogLabel(subLabels[0],...subLabels.slice(1))
        }
    }

    public setSubLabels(...subLabels:string[]):void{
        this.subLabel = new LogLabel(subLabels[0],...subLabels.slice(1))
    }

    public resolveString():string {
        const result = `<${this.name}>` 
        if(this.subLabel === undefined){
            return result
        }

        return result + this.subLabel.resolveString();
    }
}