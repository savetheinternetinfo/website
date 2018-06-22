import {Container, decorate, inject, injectable, interfaces} from 'inversify';
import { autoProvide, makeProvideDecorator, makeFluentProvideDecorator } from 'inversify-binding-decorators';
import {Controller} from 'tsoa';

const iocContainer = new Container();

const provide = makeProvideDecorator(iocContainer);
const fluentProvider = makeFluentProvideDecorator(iocContainer);

const provideNamed = function(
    identifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>,
    name: string
) {
    return fluentProvider(identifier)
        .whenTargetNamed(name)
        .done();
};

const provideSingleton  = function(
    identifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>
) {
    return fluentProvider(identifier)
        .inSingletonScope()
        .done();
};

decorate(injectable(), Controller);

export { iocContainer, autoProvide, provide, provideSingleton, provideNamed, inject };