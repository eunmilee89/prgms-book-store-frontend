import { Category } from '../models/category.model';
import { httpClient } from './http';

// 서버는 { category_id, category_name } 형태로 응답하므로 프론트 모델에 맞게 변환
interface CategoryResponse {
  id?: number;
  name?: string;
  category_id?: number;
  category_name?: string;
}

export const fetchCategory = async (): Promise<Category[]> => {
  const response = await httpClient.get<CategoryResponse[]>('/categories');
  return response.data.map((item) => ({
    id: item.id ?? item.category_id ?? null,
    name: item.name ?? item.category_name ?? '',
  }));
};
