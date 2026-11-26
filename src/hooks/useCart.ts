import { useEffect, useState } from "react";
import { Cart } from "../models/cart.model";
import { deleteCart, fetchCart } from "../api/carts.api";

export const useCart = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isEmpty = !isLoading && carts.length === 0;

  const deleteCartItem = (id: number) => {
    deleteCart(id)
      .then(() => {
        setCarts(carts.filter((cart) => cart.id !== id));
      })
      .catch((err) => console.error("장바구니 삭제 실패", err));
  };

  useEffect(() => {
    fetchCart()
      .then((carts) => setCarts(carts))
      .catch((err) => console.error("장바구니 조회 실패", err))
      .finally(() => setIsLoading(false));
  }, []);

  return { carts, isEmpty, deleteCartItem };
};
