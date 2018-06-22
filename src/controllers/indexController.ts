import {Tags, Controller, Get, Route} from 'tsoa';
import {provideSingleton} from '../ioc';
import {View} from '../models/View';

@Route()
@Tags('index')
@provideSingleton(IndexController)
export class IndexController extends Controller {

    @Get()
    public index(): View {
        return new View('index');
    }

}
