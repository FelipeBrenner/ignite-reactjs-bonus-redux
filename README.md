<img alt="ignite-reactjs" title="ignite-reactjs" src=".github/cover-reactjs.png">

<h1 align="center">
  Redux
</h1>

## 💻 Repositório

Repositório criado para estudo do Redux, biblioteca JavaScript pra gerenciamento de estado, a partir de videos disponibilizados como um bônus na trilha de ReactJS do Bootcamp Ignite da Rocketseat.

## 📖 Conceitos

- Quando o React nasceu a Context API do jeito que a gente conheçe não existia, era bem complexa, meio difícil de utilizar, não era segura para compartilhamento de estado. Para isso que surgiram as bibliotecas Redux e MobX.
- Context API não substitui totalmente o uso destas bibliotecas, um dos problemas dela é que o estado compartilhado não pode ser muito complexo, ela serve para compartilhar informações simples.
- Context API é boa por não precisar ficar passando as informações do dashboard por propriedades de componente pra componente, caindo no problema de Prop Drilling, que é quando você passa uma props de um pai para um filho, o filho passa para o filho dele, e assim por diante, gerando um "vazamento de props". Mas para estados mais complexos onde é preciso mais performance, a Context API começa a sofrer. Quando é preciso principalmente de estados globais na aplicação, que vários componentes da aplicação vão ter contato com esse estado, e vão tratar ele de diferentes formas a todo instante, a Context API para de resolver.
- Essas bibliotecas criadas então para controle de estado fazem com que seja possível um controle melhor sobre a granularidade dos dados, é possível ter um estado complexo onde vários outros componentes dependem daquela informação em si e atualizá-lo e obter informações dele de uma forma muito mais imutável.
- O Redux implementou dentro do React a arquitetura Flux, a qual perdeu ultimamente relevância no mercado principalmente por ter um alto nível de complexidade para aplicar, mas é indispensável o estudo, pois a maioria das aplicações React do mercado ainda vão estar utilizando Redux por um bom tempo. O Redux não é ruim, só é apenas muito complexo para resolver coisas as vezes muito simples.

## 🚀 Código e explicações

### <strong>src/store/index.tsx<strong>

```ts
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import createSagaMiddleware from "redux-saga";

import { ICartState } from "./modules/cart/types";

import rootReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSaga";

export interface IState {
  cart: ICartState;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

// Função principal, chamada uma vez
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export default store;
```

### <strong>src/App.tsx<strong>

```ts
import React from "react";
import { Provider } from "react-redux";

import store from "./store";

import Catalog from "./components/Catalog";
import Cart from "./components/Cart";

function App() {
  return (
    // Contexto, no qual o store é provido para todos os componentes de dentro
    <Provider store={store}>
      <Catalog />
      <Cart />
    </Provider>
  );
}

export default App;
```
