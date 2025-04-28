import { Cart } from '../models/cart.model';
import { httpClient } from './http';

interface AddCartParams {
  bookId: number;
  quantity: number;
}

export const addCart = async (params: AddCartParams) => {
  const response = await httpClient.post(`/carts`, params);
  return response.data;
};

export const fetchCart = async () => {
  const response = await httpClient.get<Cart[]>('/carts');
  return response.data;
};

export const deleteCart = async (cardId: number) => {
  const response = await httpClient.delete(`/carts/${cardId}`);
  return response.data;
};
