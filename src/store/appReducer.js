import {modalStatus} from './modal/reducer';
import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { authen } from './authentication/reducer';
import loading from './loading/reducer';
import services from './utils/reducer';
import products from './products/reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    modalStatus,
    authen,
    loading,
    services,
    products
});
export const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));