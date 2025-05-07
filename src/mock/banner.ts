import { HttpResponse, http } from 'msw';
import { Banner } from '@/models/banner.model';

const bannerData: Banner[] = [
  {
    id: 1,
    title: '신간 출시: 아주 작은 습관의 힘',
    description: '더 나은 습관으로 삶을 바꿔보세요. 지금 시작하세요.',
    image: 'http://picsum.photos/id/111/1200/400',
    url: 'http://some.url',
    target: '_blank',
  },
  {
    id: 2,
    title: '무라카미 하루키 신작',
    description: '무라카미의 몽환적인 세계를 지금 바로 경험해보세요.',
    image: 'http://picsum.photos/id/222/1200/400',
    url: 'http://some.url',
    target: '_self',
  },
  {
    id: 3,
    title: '봄맞이 도서 할인!',
    description: '선택된 소설 최대 40% 할인. 기간 한정!',
    image: 'http://picsum.photos/id/33/1200/400',
    url: 'http://some.url',
    target: '_blank',
  },
];

export const banners = http.get('http://localhost:9999/banners', () => {
  return HttpResponse.json(bannerData, {
    status: 200,
  });
});
