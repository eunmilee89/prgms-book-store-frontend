export interface Category {
  id: number | null; // 전체 카테고리는 null로 표현
  name: string;
  isActive?: boolean;
}
