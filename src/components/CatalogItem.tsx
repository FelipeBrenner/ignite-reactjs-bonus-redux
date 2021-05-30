import React, { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import { IProduct } from "../store/modules/cart/types";
import { addProductToCartRequest } from ".././store/modules/cart/actions";
import { IState } from "../store";

interface CatalogItemProps {
  product: IProduct;
}

const CatalogItem: React.FC<CatalogItemProps> = ({ product }) => {
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

  return (
    <article key={product.id}>
      <strong>{product.title}</strong> {" - "}
      <span>{product.price}</span>{" "}
      <button type="button" onClick={handleAddProductToCart}>
        Comprar
      </button>
      {hasFailedStockCheck && (
        <span style={{ color: "red" }}>Falta de estoque</span>
      )}
    </article>
  );
};

export default CatalogItem;
