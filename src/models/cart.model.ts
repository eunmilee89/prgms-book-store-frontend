export interface Cart {
  id: number;
  bookId: number;
  title: string;
  summary: string;
  quantity: number;
  price: number;
  img?: number; // 서버가 내려주면 도서 표지와 동일하게 표시
}
