// O rootReducer serve para unir vários reducers dentro de um único estado disponível para a aplicação
import { combineReducers } from "redux";
import cart from "./cart/reducer";

export default combineReducers({
  cart,
});
