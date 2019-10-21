import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route , Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxPromise from 'redux-promise';
import createSagaMiddleware from 'redux-saga';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import SignIn from './containers/Sign-In';
import MigrationDetails from './containers/Migration-Details';
import MigrationNew from './containers/Migration-New';
import MigrationAll from './containers/Migration-All';

import Dashboard from './containers/Dashboard';
import reducers from './reducers';
import rootSaga from './sagas/index';
import * as serviceWorker from './serviceWorker';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers,composeWithDevTools(applyMiddleware(ReduxPromise, sagaMiddleware)));






ReactDOM.render(
    <Provider store={store}>
        {/*<Provider store={createStoreWithMiddleware(reducers)}>*/}
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/migrations/:id" component={MigrationDetails} />
                    <Route path="/migration/new" component={MigrationNew} />
                    <Route path="/migrations" component={MigrationAll} />
                    <Route path="/dashboard" component={Dashboard} store={store}/>
                    <Route exact path="/" component={Dashboard} store={store} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
sagaMiddleware.run(rootSaga);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
