import styled from 'styled-components';
import Title from '../components/common/Title';
import BooksFilter from '../components/books/BooksFilter';
import BooksList from '../components/books/BooksList';
import BooksEmpty from '../components/books/BooksEmpty';
import BooksViewSwitcher from '../components/books/BooksViewSwitcher';
import Loading from '@/components/common/Loading';
import { useBooksInfinite } from '@/hooks/useBooksInfinite';
import Button from '@/components/common/Button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Theme } from '@/style/theme';
import { Pagination as IPagination } from '@/models/pagination.model';

export default function Books() {
  const {
    books,
    pagination,
    isEmpty,
    isBooksLoading,
    fetchNextPage,
    hasNextPage,
  } = useBooksInfinite();

  const moreRef = useIntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      loadMore();
    }
  });

  const loadMore = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  const totalCount = (pagination as Partial<IPagination> | undefined)
    ?.totalCount;

  const header = (
    <div className='page-head'>
      <span className='eyebrow'>Library</span>
      <Title size='large'>도서 둘러보기</Title>
      {totalCount !== undefined && (
        <p className='count'>
          총 <strong>{totalCount}</strong>권의 책
        </p>
      )}
    </div>
  );

  return (
    <StyledBooks>
      {header}
      <div className='filter'>
        <BooksFilter />
        <BooksViewSwitcher />
      </div>
      {isBooksLoading && books.length === 0 ? (
        <Loading />
      ) : isEmpty ? (
        <BooksEmpty />
      ) : (
        <>
          <BooksList books={books} />
          <div className='more' ref={moreRef}>
            {isBooksLoading ? (
              <Loading />
            ) : hasNextPage ? (
              <Button
                size='medium'
                scheme='normal'
                onClick={() => fetchNextPage()}
              >
                더보기
              </Button>
            ) : (
              <span className='end'>모든 책을 다 보셨어요</span>
            )}
          </div>
        </>
      )}
    </StyledBooks>
  );
}

const StyledBooks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;

  .page-head {
    .eyebrow {
      display: block;
      margin-bottom: 6px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: ${({ theme }) => (theme as Theme).color.accent};
    }

    .count {
      margin-top: 6px;
      font-size: 0.9rem;
      color: ${({ theme }) => (theme as Theme).color.muted};

      strong {
        color: ${({ theme }) => (theme as Theme).color.text};
      }
    }
  }

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding-bottom: 24px;
    border-bottom: 1px solid ${({ theme }) => (theme as Theme).color.border};
  }

  .more {
    display: flex;
    justify-content: center;
    padding: 24px 0 0;

    .end {
      font-size: 0.875rem;
      color: ${({ theme }) => (theme as Theme).color.secondary};
    }
  }

  @media ${({ theme }) => `screen and ${(theme as Theme).mediaQuery.mobile}`} {
    gap: 20px;

    .page-head h1 {
      font-size: 1.6rem;
    }

    .filter {
      gap: 10px;
      padding-bottom: 16px;

      > :first-child {
        flex: 1;
      }

      > :last-child {
        flex-shrink: 0;
      }
    }
  }
`;
