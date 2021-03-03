import 'reflect-metadata';
import './index.css';
import {RouteResultsHandler} from './routing/route-results.handler'
import {DI} from './di'

DI.init()

const routeResultsHandler = new RouteResultsHandler(document.getElementById('root'))
routeResultsHandler.start()
