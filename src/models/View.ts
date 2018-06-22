export class View {

    private _templateName: string;
    private _args: any;

    constructor(templateName: string, args?: any) {
        this._templateName = templateName;
        this._args = args;
    }

    get templateName(): string {
        return this._templateName;
    }

    set templateName(value: string) {
        this._templateName = value;
    }

    get args(): any {
        return this._args;
    }

    set args(value: any) {
        this._args = value;
    }
}