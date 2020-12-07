import 'reflect-metadata';
import './index.css';
import {startRouter} from './routing'
import {routes} from './routes'
import {initServices} from './di/di-container';

initServices()
startRouter(routes, document.getElementById('root'))
