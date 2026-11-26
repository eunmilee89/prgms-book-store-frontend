import MainNewBooks from '@/components/main/MainNewBooks';
import { useMain } from '@/hooks/useMain';
import styled from 'styled-components';
import MainReview from '@/components/main/MainReview';
import MainBest from '@/components/main/MainBest';
import Banner from '@/components/common/banner/Banner';
import SectionHeader from '@/components/main/SectionHeader';

export default function Home() {
  const { reviews, newBooks, bestBooks, banners } = useMain();

  return (
    <StyledHome>
      <Banner banners={banners} />
      <section className='section'>
        <SectionHeader
          eyebrow='Best Seller'
          title='지금 가장 많이 읽는 책'
          moreLink='/books'
        />
        <MainBest books={bestBooks} />
      </section>
      <section className='section'>
        <SectionHeader
          eyebrow='New Arrivals'
          title='이번 주 새로 들어온 책'
          moreLink='/books?news=true'
        />
        <MainNewBooks books={newBooks} />
      </section>
      <section className='section review'>
        <SectionHeader eyebrow='Reviews' title='독자들의 한 줄 기록' />
        <MainReview reviews={reviews} />
      </section>
    </StyledHome>
  );
}

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  gap: 72px;

  @media ${({ theme }) => `screen and ${theme.mediaQuery.mobile}`} {
    gap: 48px;
  }
`;
