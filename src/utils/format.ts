import dayjs from 'dayjs';

// DB 집계값이 문자열로 올 수 있어 숫자로 변환 후 포맷
export const formatNumber = (number: number | string) => {
  return Number(number).toLocaleString();
};

export const formatDate = (date: string, format?: string) => {
  return dayjs(date).format(format ? format : 'YYYY년 MM월 DD일');
};
