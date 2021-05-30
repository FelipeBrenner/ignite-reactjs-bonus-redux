/* O reducer é o ponto principal de um estado, no caso o cart, ele determina quais as informações que vão 
estar contidas no estado e é quem ouve as ações para alterá-las */
import { Reducer } from "redux";
// immer é uma biblioteca que ajuda a evitar e verbosidade na hora de tratar a imutabilidade do React
import produce from "immer";
import { ActionTypes, ICartState } from "./types";

// Informações do estado
const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: [],
};

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  /* O produce produz um novo estado a partir do rascunho do estado anterior, no qual o draft tem o mesmo 
  formato do estado, e pode ser feito alterações nele sem o conceito da imutabilidade */
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.addProductToCartSuccess: {
        const { product } = action.payload;

        const productInCartIndex = draft.items.findIndex(
          (item) => item.product.id === product.id
        );

        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity++;
        } else {
          draft.items.push({ product, quantity: 1 });
        }

        break;
      }
      case ActionTypes.addProductToCartFailure: {
        draft.failedStockCheck.push(action.payload.productId);
        break;
      }
      default: {
        return draft;
      }
    }
  });
};

export default cart;
