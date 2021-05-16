import { createStore, applyMiddleware } from 'redux';
// import logger from './middleware/logger';
// import test from './middleware/test';
// import thunk from './middleware/thunk';
import reducer from './reducers/root.reducers'
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/root.saga'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)
