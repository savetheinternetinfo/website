export class GenericError extends Error {

    constructor(message?: string, public child?: Error) {
        super(message);
    }

}