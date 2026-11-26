import styled from 'styled-components';
import { useCategory } from '../../hooks/useCategory';
import { useSearchParams } from 'react-router-dom';
import { QUERYSTRING } from '../../constants/querystring';
import { Theme } from '../../style/theme';
import { FaStar } from 'react-icons/fa';

export default function BooksFilter() {
  const { category } = useCategory();
  const [searchParams, setSearchParams] = useSearchParams();
  const handleCategory = (id: number | null) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (id === null) {
      newSearchParams.delete(QUERYSTRING.CATEGORY_ID);
    } else {
      newSearchParams.set(QUERYSTRING.CATEGORY_ID, id.toString());
    }

    setSearchParams(newSearchParams);
  };

  const handleNews = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newSearchParams.get(QUERYSTRING.NEWS)) {
      newSearchParams.delete(QUERYSTRING.NEWS);
    } else {
      newSearchParams.set(QUERYSTRING.NEWS, 'true');
    }

    setSearchParams(newSearchParams);
  };

  const hasCategory = searchParams.has(QUERYSTRING.CATEGORY_ID);

  return (
    <StyledBooksFilter>
      <div className='category'>
        {category.map((item) => {
          const active = item.id === null ? !hasCategory : !!item.isActive;
          return (
            <button
              type='button'
              key={item.id ?? 'all'}
              className={active ? 'chip active' : 'chip'}
              aria-pressed={active}
              onClick={() => handleCategory(item.id)}
            >
              {item.name}
            </button>
          );
        })}
      </div>
      <span className='divider' />
      <button
        type='button'
        className={
          searchParams.get(QUERYSTRING.NEWS) ? 'chip news active' : 'chip news'
        }
        aria-pressed={!!searchParams.get(QUERYSTRING.NEWS)}
        onClick={handleNews}
      >
        <FaStar /> 신간
      </button>
    </StyledBooksFilter>
  );
}

const StyledBooksFilter = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;

  .category {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .divider {
    width: 1px;
    height: 20px;
    background: ${({ theme }) => (theme as Theme).color.border};
  }

  .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 36px;
    padding: 0 16px;
    border: 1px solid ${({ theme }) => (theme as Theme).color.border};
    border-radius: ${({ theme }) => (theme as Theme).borderRadius.pill};
    background: ${({ theme }) => (theme as Theme).color.surface};
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }) => (theme as Theme).color.muted};
    cursor: pointer;
    transition: all 0.18s ease;

    svg {
      width: 11px;
      height: 11px;
      fill: currentColor;
    }

    &:hover {
      color: ${({ theme }) => (theme as Theme).color.text};
      border-color: ${({ theme }) => (theme as Theme).color.muted};
    }

    &.active {
      color: ${({ theme }) => (theme as Theme).color.onPrimary};
      background: ${({ theme }) => (theme as Theme).color.primary};
      border-color: ${({ theme }) => (theme as Theme).color.primary};
    }

    &.news.active {
      background: ${({ theme }) => (theme as Theme).color.accent};
      border-color: ${({ theme }) => (theme as Theme).color.accent};
      color: #fff;
    }
  }

  /* 모바일: 칩을 한 줄로 두고 가로 스크롤 */
  @media ${({ theme }) => `screen and ${(theme as Theme).mediaQuery.mobile}`} {
    flex-wrap: nowrap;
    gap: 8px;
    min-width: 0;
    overflow-x: auto;
    margin-left: -16px;
    padding: 2px 0 2px 16px;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    /* 오른쪽 끝을 흐리게 해서 더 스크롤할 수 있음을 표시 */
    mask-image: linear-gradient(to right, #000 82%, transparent);
    -webkit-mask-image: linear-gradient(to right, #000 82%, transparent);

    &::-webkit-scrollbar {
      display: none;
    }

    .category {
      flex-wrap: nowrap;
      flex-shrink: 0;
    }

    .chip {
      flex-shrink: 0;
      height: 34px;
      padding: 0 14px;
      font-size: 0.8125rem;
    }

    .divider {
      flex-shrink: 0;
    }

    /* 마지막 칩 뒤 여백 (스크롤 끝 여유) */
    &::after {
      content: '';
      flex: 0 0 4px;
    }
  }
`;
