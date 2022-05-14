import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import LoginReducer from './reducers/login/LoginReducer';
import GetDonorsReducer from './reducers/donors/DonorsReducer';


let rootReducer = combineReducers({
  loginState: LoginReducer,
  donorsState: GetDonorsReducer,
})

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, logger),
);

let store = createStore(rootReducer, enhancer)

export { store }