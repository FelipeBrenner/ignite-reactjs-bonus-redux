import { AxiosResponse } from "axios";
import { all, select, takeLatest, call, put } from "redux-saga/effects";
import { IState } from "../..";
import api from "../../../services/api";
import {
  addProductToCartFailure,
  addProductToCartRequest,
  addProductToCartSuccess,
} from "./actions";
import { ActionTypes } from "./types";

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>;

interface IStockResponse {
  id: number;
  quantity: number;
}

function* checkProductStock({ payload }: CheckProductStockRequest) {
  const { product } = payload;

  // O select serve para buscar informações do estado
  const currentQuantity: number = yield select((state: IState) => {
    return (
      state.cart.items.find((item) => item.product.id === product.id)
        ?.quantity ?? 0
    );
  });

  const availableStockResponse: AxiosResponse<IStockResponse> = yield call(
    api.get,
    `stock/${product.id}`
  );

  if (availableStockResponse.data.quantity > currentQuantity) {
    /* O put é a mesma coisa que o dispatch, serve para disparar uma ação. Todo método que vem do saga
    precisa ter o yield na frente. */
    yield put(addProductToCartSuccess(product));
  } else {
    yield put(addProductToCartFailure(product.id));
  }
}

export default all([
  /* O takeLatest houve a última ação executada a ser interceptada antes do reducer.
   Existe o takeEvery também, mas aí como a função checkProductStock é assincrona, se fosse clicado em 
   comprar várias vezes enquanto ela estava processando, seria disparado todas as vezes, e não somente 
   a última. */
  takeLatest(ActionTypes.addProductToCartRequest, checkProductStock),
]);
