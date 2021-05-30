import { applyMiddleware, createStore } from "redux";
// Extensão do navegador para debugar as ações do redux
import { composeWithDevTools } from "redux-devtools-extension";

import createSagaMiddleware from "redux-saga";

import { ICartState } from "./modules/cart/types";

import rootReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSaga";

export interface IState {
  cart: ICartState;
}

// Middleware é um interceptador executado no meio da action e do reducer
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

// Função principal, chamada uma vez
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export default store;
