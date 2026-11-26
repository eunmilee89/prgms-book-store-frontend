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

// 서버는 book_id(스네이크 케이스)로 응답하므로 프론트 모델(bookId)에 맞게 변환
interface CartResponse extends Omit<Cart, 'bookId'> {
  bookId?: number;
  book_id?: number;
}

export const fetchCart = async (): Promise<Cart[]> => {
  const response = await httpClient.get<CartResponse[]>('/carts');
  return response.data.map(({ book_id, bookId, ...rest }) => ({
    ...rest,
    bookId: (bookId ?? book_id) as number,
  }));
};

export const deleteCart = async (cardId: number) => {
  const response = await httpClient.delete(`/carts/${cardId}`);
  return response.data;
};
