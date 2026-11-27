import styled from 'styled-components';
import { Book } from '../../models/book.model';
import { formatNumber } from '../../utils/format';
import { FaHeart } from 'react-icons/fa';
import { Theme } from '../../style/theme';
import { ViewMode } from './BooksViewSwitcher';
import { Link } from 'react-router-dom';
import BookCover from '../common/BookCover';

interface Props {
  book: Book;
  view?: ViewMode;
}

export default function BookItem({ book, view = 'grid' }: Props) {
  return (
    <StyledBookItem view={view}>
      <Link to={`/books/${book.id}`}>
        <div className='img'>
          <BookCover img={book.img} title={book.title} author={book.author} />
        </div>
        <div className='content'>
          <h2 className='title'>{book.title}</h2>
          <p className='author'>{book.author}</p>
          <p className='summary'>{book.summary}</p>
          <div className='meta'>
            <p className='price'>{formatNumber(book.price)}원</p>
            <div className='likes'>
              <FaHeart />
              <span>{book.likes}</span>
            </div>
          </div>
        </div>
      </Link>
    </StyledBookItem>
  );
}

export const StyledBookItem = styled.div<Pick<Props, 'view'>>`
  height: 100%;

  a {
    display: flex;
    flex-direction: ${({ view }) => (view === 'grid' ? 'column' : 'row')};
    gap: ${({ view }) => (view === 'grid' ? '14px' : '24px')};
    height: 100%;
    padding: ${({ view }) => (view === 'grid' ? '0' : '20px')};
    border-radius: ${({ theme }) => (theme as Theme).borderRadius.large};
    background: ${({ view, theme }) =>
      view === 'grid' ? 'transparent' : (theme as Theme).color.surface};
    border: ${({ view, theme }) =>
      view === 'grid' ? '0' : `1px solid ${(theme as Theme).color.border}`};
    text-decoration: none;
    color: inherit;
  }

  .img {
    flex-shrink: 0;
    width: ${({ view }) => (view === 'grid' ? '100%' : '120px')};
    transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  a:hover .img {
    transform: translateY(-6px);
  }

  a:hover .img > div {
    box-shadow: ${({ theme }) => (theme as Theme).shadow.large};
  }

  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    padding: ${({ view }) => (view === 'grid' ? '0 2px' : '4px 0')};

    .title {
      font-size: ${({ view }) => (view === 'grid' ? '1rem' : '1.2rem')};
      font-weight: 700;
      line-height: 1.4;
      margin: 0 0 4px;
      color: ${({ theme }) => (theme as Theme).color.text};
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      word-break: keep-all;
    }

    .author {
      font-size: 0.8125rem;
      color: ${({ theme }) => (theme as Theme).color.muted};
      margin: 0 0 8px;
    }

    .summary {
      display: ${({ view }) => (view === 'grid' ? 'none' : '-webkit-box')};
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: 0.875rem;
      line-height: 1.6;
      color: ${({ theme }) => (theme as Theme).color.muted};
      margin: 0 0 12px;
    }

    .meta {
      margin-top: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .price {
      font-size: 0.9375rem;
      font-weight: 800;
      color: ${({ theme }) => (theme as Theme).color.text};
      margin: 0;
    }

    .likes {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 0.8125rem;
      font-weight: 600;
      color: ${({ theme }) => (theme as Theme).color.muted};

      svg {
        width: 12px;
        height: 12px;
        fill: ${({ theme }) => (theme as Theme).color.accent};
      }
    }
  }

  @media ${({ theme }) => `screen and ${(theme as Theme).mediaQuery.mobile}`} {
    a {
      gap: ${({ view }) => (view === 'grid' ? '10px' : '16px')};
      padding: ${({ view }) => (view === 'grid' ? '0' : '14px')};
    }

    .img {
      width: ${({ view }) => (view === 'grid' ? '100%' : '84px')};
    }

    a:hover .img {
      transform: none;
    }

    .content {
      .title {
        font-size: ${({ view }) => (view === 'grid' ? '0.9375rem' : '1rem')};
      }

      .summary {
        font-size: 0.8125rem;
        margin-bottom: 8px;
      }

      .price {
        font-size: 0.875rem;
      }
    }
  }
`;
