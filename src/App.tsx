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
