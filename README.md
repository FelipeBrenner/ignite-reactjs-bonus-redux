<img alt="ignite-reactjs" title="ignite-reactjs" src=".github/cover-reactjs.png">

<h1 align="center">
  Redux
</h1>

## 🚀 Tecnologias e bibliotecas utilizadas

- ReactJS
- TypeScript
- Redux (biblioteca pra gerenciamento de estado)
- redux-saga (biblioteca que foca em fazer os efeitos colaterais (exemplo chamadas assíncronas para buscar dados em uma API) em aplicações React/Redux serem mais fáceis e simples de se criar e manter; é um middlaware do Redux, ou seja, um interceptador, executado no meio da action e do reducer)
- immer (biblioteca que ajuda a evitar e verbosidade na hora de tratar a imutabilidade do React)
- redux-devtools-extension (biblioteca para utilizar uma extensão do navegador para debugar as action do Redux)

## 💻 Repositório

Repositório criado para estudo do Redux, biblioteca JavaScript pra gerenciamento de estado, a partir de videos disponibilizados como um bônus na trilha de ReactJS do Bootcamp Ignite da Rocketseat.

## 📖 Conceitos

- Quando o React nasceu a Context API do jeito que a gente conheçe não existia, era bem complexa, meio difícil de utilizar, não era segura para compartilhamento de estado. Para isso que surgiram as bibliotecas Redux e MobX.
- Context API não substitui totalmente o uso destas bibliotecas, um dos problemas dela é que o estado compartilhado não pode ser muito complexo, ela serve para compartilhar informações simples.
- Context API é boa por não precisar ficar passando as informações do dashboard por propriedades de componente pra componente, caindo no problema de Prop Drilling, que é quando você passa uma props de um pai para um filho, o filho passa para o filho dele, e assim por diante, gerando um "vazamento de props". Mas para estados mais complexos onde é preciso mais performance, a Context API começa a sofrer. Quando é preciso principalmente de estados globais na aplicação, que vários componentes da aplicação vão ter contato com esse estado, e vão tratar ele de diferentes formas a todo instante, a Context API para de resolver.
- Essas bibliotecas criadas então para controle de estado fazem com que seja possível um controle melhor sobre a granularidade dos dados, é possível ter um estado complexo onde vários outros componentes dependem daquela informação em si e atualizá-lo e obter informações dele de uma forma muito mais imutável.
- O Redux implementou dentro do React a arquitetura Flux, a qual perdeu ultimamente relevância no mercado principalmente por ter um alto nível de complexidade para aplicar, mas é indispensável o estudo, pois a maioria das aplicações React do mercado ainda vão estar utilizando Redux por um bom tempo. O Redux não é ruim, só é apenas muito complexo para resolver coisas as vezes muito simples.

## 📖 Índice de comentários e anotações

- [src/components/CatalogItem.tsx](https://github.com/FelipeBrenner/ignite-reactjs-bonus-redux/blob/main/src/components/CatalogItem.tsx)

```tsx
import { useDispatch, useSelector } from "react-redux";
```

```tsx
const dispatch = useDispatch();

// useSelector busca as informações do estado
const hasFailedStockCheck = useSelector<IState, boolean>((state) => {
  return state.cart.failedStockCheck.includes(product.id);
});

const handleAddProductToCart = useCallback(() => {
  /* Simplesmente chamar a função addProductToCartRequest() vai só retornar o conteúdo que ela tem no seu 
    return, por isso deve ser usado o dispatch */
  dispatch(addProductToCartRequest(product));
}, [dispatch, product]);
```

- [src/store/modules/cart/actions.ts](https://github.com/FelipeBrenner/ignite-reactjs-bonus-redux/blob/main/src/store/modules/cart/actions.ts)

```ts
/* Ações do usuário que podem alterar o estado, que normalmente uma ação é separada em três, uma
 requisição, que será processada na middleware saga, e se der certa roda a SUCCESS e se der 
 errada roda a FAILURE */
import { ActionTypes, IProduct } from "./types";
```

- [src/store/modules/cart/reducer.ts](https://github.com/FelipeBrenner/ignite-reactjs-bonus-redux/blob/main/src/store/modules/cart/reducer.ts)

```ts
/* O reducer é o ponto principal de um estado, no caso o cart, ele determina quais as informações que vão 
estar contidas no estado e é quem ouve as ações para alterá-las */
import { Reducer } from "redux";
// immer é uma biblioteca que ajuda a evitar e verbosidade na hora de tratar a imutabilidade do React
import produce from "immer";
```

```ts
const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  /* O produce produz um novo estado a partir do rascunho do estado anterior, no qual o draft tem o mesmo
  formato do estado, e pode ser feito alterações nele sem o conceito da imutabilidade */
  return produce(state, (draft) => {
```

- [src/store/modules/cart/sagas.ts](https://github.com/FelipeBrenner/ignite-reactjs-bonus-redux/blob/main/src/store/modules/cart/sagas.ts)

```ts
import { all, select, takeLatest, call, put } from "redux-saga/effects";
```

```ts
// O select serve para buscar informações do estado
  const currentQuantity: number = yield select((state: IState) => {
```

```ts
if (availableStockResponse.data.quantity > currentQuantity) {
  /* O put é a mesma coisa que o dispatch, serve para disparar uma ação. Todo método que vem do saga
    precisa ter o yield na frente. */
  yield put(addProductToCartSuccess(product));
} else {
  yield put(addProductToCartFailure(product.id));
}
```

```ts
export default all([
  /* O takeLatest houve a última ação executada a ser interceptada antes do reducer.
   Existe o takeEvery também, mas aí como a função checkProductStock é assincrona, se fosse clicado em 
   comprar várias vezes enquanto ela estava processando, seria disparado todas as vezes, e não somente 
   a última. */
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock),
]);
```

- [src/store/modules/rootReducer.ts](https://github.com/FelipeBrenner/ignite-reactjs-bonus-redux/blob/main/src/store/modules/rootReducer.ts)

```ts
// O rootReducer serve para unir vários reducers dentro de um único estado disponível para a aplicação
import { combineReducers } from "redux";
```

- [src/store/index.ts](https://github.com/FelipeBrenner/ignite-reactjs-bonus-redux/blob/main/src/store/index.ts)

```ts
import { applyMiddleware, createStore } from "redux";
// Extensão do navegador para debugar as ações do redux
import { composeWithDevTools } from "redux-devtools-extension";

import createSagaMiddleware from "redux-saga";

// Middleware é um interceptador executado no meio da action e do reducer
const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

// Função principal, chamada uma vez
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
```

- [src/App.tsx](https://github.com/FelipeBrenner/ignite-reactjs-bonus-redux/blob/main/src/App.tsx)

```tsx
import { Provider } from "react-redux";

import store from "./store";

import Catalog from "./components/Catalog";
import Cart from "./components/Cart";
```

```tsx
// Contexto, no qual o store é provido para todos os componentes de dentro
<Provider store={store}>
  <Catalog />
  <Cart />
</Provider>
```

- Primeira vez que vi Generator, que é mais ou menos uma função assíncrona. Na verdade, quando utilizado async await, no final das contas eles são transformados em Generators.

```ts
export default function* rootSaga(): any {
  return yield all([cart]);
}
```

```ts
export default async function rootSaga(): any {
  return await all([cart]);
}
```

## 📷 Execução

Print para mostrar a execução utilizada para estudar e aplicar esses conceitos e a extensão para debugar as ações do Redux

<img alt="print" title="print" src=".github/print.png">

## ⚙ Clone

```bash
# Abra um terminal e copie este repositório com o comando
$ git clone https://github.com/FelipeBrenner/ignite-reactjs-bonus-redux.git

# Acesse a pasta da aplicação
$ cd ignite-reactjs-bonus-redux

# Instale as dependências
$ yarn

# Inicie o json com informações pré definidas dos produtos e estoque
$ yarn server

# Inicie a aplicação
$ yarn dev

```

---

Por Felipe Brenner
