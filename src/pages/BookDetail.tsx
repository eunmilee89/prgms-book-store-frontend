import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useBook } from '../hooks/useBook';
import Title from '../components/common/Title';
import { BookDetail as IBookDetail } from '../models/book.model';
import { formatDate, formatNumber } from '../utils/format';
import { Link } from 'react-router-dom';
import { Theme } from '../style/theme';
import EllipsisBox from '../components/common/EllipsisBox';
import LikeButton from '../components/book/LikeButton';
import AddToCart from '../components/book/AddToCart';
import BookReview from '@/components/book/BookReview';
import { Tab, Tabs } from '@/components/common/Tabs';
import Modal from '@/components/common/Modal';
import BookCover from '@/components/common/BookCover';
import Loading from '@/components/common/Loading';
import { useState } from 'react';
import { FaSearchPlus } from 'react-icons/fa';

const bookInfoList = [
  {
    label: '카테고리',
    key: 'categoryName',
    filter: (book: IBookDetail) => (
      <Link to={`/books?category_id=${book.category_id}`}>
        {book.categoryName}
      </Link>
    ),
  },
  {
    label: '포맷',
    key: 'form',
  },
  {
    label: '페이지',
    key: 'pages',
    filter: (book: IBookDetail) => `${book.pages}쪽`,
  },
  {
    label: 'ISBN',
    key: 'isbn',
  },
  {
    label: '출간일',
    key: 'pubDate',
    filter: (book: IBookDetail) => {
      return formatDate(book.pubDate);
    },
  },
];

export default function BookDetail() {
  const { bookId } = useParams();
  const { book, likeToggle, reviews, addReview } = useBook(bookId);
  const [isImgOpen, setIsImgOpen] = useState(false);

  if (!book) return <Loading />;

  return (
    <StyledBookDetail>
      <header className='header'>
        <div className='cover'>
          <button
            type='button'
            className='cover-button'
            onClick={() => setIsImgOpen(true)}
            aria-label='표지 크게 보기'
          >
            <BookCover
              img={book.img}
              title={book.title}
              author={book.author}
              size='large'
            />
            <span className='zoom'>
              <FaSearchPlus />
            </span>
          </button>
        </div>
        <Modal isOpen={isImgOpen} onClose={() => setIsImgOpen(false)}>
          <BookCover
            img={book.img}
            title={book.title}
            author={book.author}
            size='large'
          />
        </Modal>
        <div className='info'>
          {book.categoryName && (
            <span className='category'>{book.categoryName}</span>
          )}
          <Title size='large'>{book.title}</Title>
          <p className='author'>{book.author} 지음</p>
          <p className='price'>
            {formatNumber(book.price)}
            <span>원</span>
          </p>
          {book.summary && <p className='summary'>{book.summary}</p>}
          <dl className='meta'>
            {bookInfoList.map((item) => (
              <div key={item.key}>
                <dt>{item.label}</dt>
                <dd>
                  {item.filter
                    ? item.filter(book)
                    : book[item.key as keyof IBookDetail]}
                </dd>
              </div>
            ))}
          </dl>
          <div className='actions'>
            <AddToCart book={book} />
            <LikeButton book={book} onClick={likeToggle} />
          </div>
        </div>
      </header>
      <div className='content'>
        <Tabs>
          <Tab title='상세 설명'>
            <Title size='medium'>책 소개</Title>
            <EllipsisBox lineLimit={4}>{book.detail}</EllipsisBox>
          </Tab>
          <Tab title='목차'>
            <Title size='medium'>목차</Title>
            <p className='index'>{book.contents}</p>
          </Tab>
          <Tab title={`리뷰 ${reviews.length}`}>
            <Title size='medium'>리뷰</Title>
            <BookReview reviews={reviews} onAdd={addReview} />
          </Tab>
        </Tabs>
      </div>
    </StyledBookDetail>
  );
}

const StyledBookDetail = styled.div<{ theme: Theme }>`
  .header {
    display: grid;
    grid-template-columns: minmax(260px, 380px) 1fr;
    align-items: start;
    gap: 64px;
    padding: 16px 0 56px;

    .cover {
      position: sticky;
      top: 100px;
      padding: 40px;
      border-radius: ${({ theme }) => theme.borderRadius.large};
      background: ${({ theme }) => theme.color.surfaceAlt};
    }

    .cover-button {
      position: relative;
      display: block;
      width: 100%;
      padding: 0;
      border: 0;
      background: none;
      cursor: zoom-in;

      .zoom {
        position: absolute;
        right: 10px;
        bottom: 10px;
        width: 34px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.45);
        opacity: 0;
        transition: opacity 0.2s ease;

        svg {
          width: 14px;
          height: 14px;
          fill: #fff;
        }
      }

      &:hover .zoom {
        opacity: 1;
      }
    }

    .info {
      display: flex;
      flex-direction: column;
      min-width: 0;

      .category {
        align-self: flex-start;
        margin-bottom: 14px;
        padding: 4px 12px;
        border-radius: 999px;
        font-size: 0.75rem;
        font-weight: 700;
        color: ${({ theme }) => theme.color.primary};
        background: ${({ theme }) => theme.color.surfaceAlt};
      }

      h1 {
        font-size: 2.25rem;
      }

      .author {
        margin-top: 8px;
        font-size: 1rem;
        color: ${({ theme }) => theme.color.muted};
      }

      .price {
        margin-top: 24px;
        font-size: 1.75rem;
        font-weight: 800;
        letter-spacing: -0.02em;

        span {
          margin-left: 2px;
          font-size: 1.1rem;
          font-weight: 600;
        }
      }

      .summary {
        margin-top: 20px;
        padding: 18px 20px;
        border-left: 3px solid ${({ theme }) => theme.color.accent};
        background: ${({ theme }) => theme.color.surface};
        border-radius: 0 ${({ theme }) => theme.borderRadius.default}
          ${({ theme }) => theme.borderRadius.default} 0;
        font-family: ${({ theme }) => theme.font.serif};
        font-size: 1rem;
        line-height: 1.7;
      }

      .meta {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 14px 24px;
        margin: 28px 0 0;
        padding: 24px 0;
        border-top: 1px solid ${({ theme }) => theme.color.border};
        border-bottom: 1px solid ${({ theme }) => theme.color.border};

        div {
          display: flex;
          gap: 12px;
          font-size: 0.9rem;
        }

        dt {
          width: 64px;
          flex-shrink: 0;
          color: ${({ theme }) => theme.color.secondary};
        }

        dd {
          margin: 0;
          font-weight: 500;
          word-break: break-all;
        }

        a {
          color: ${({ theme }) => theme.color.primary};
          font-weight: 600;
          text-underline-offset: 3px;
        }
      }

      .actions {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        margin-top: 28px;
      }
    }
  }

  .index {
    padding-top: 16px;
    white-space: pre-line;
    line-height: 1.8;
  }

  .tab-content h1 {
    margin-bottom: 4px;
  }

  @media ${({ theme }) => `screen and ${theme.mediaQuery.mobile}`} {
    .header {
      grid-template-columns: 1fr;
      gap: 28px;
      padding: 0 0 32px;

      .cover {
        position: static;
        padding: 28px 24%;
      }

      .info {
        h1 {
          font-size: 1.6rem;
        }

        .price {
          margin-top: 16px;
          font-size: 1.5rem;
        }

        .summary {
          font-size: 0.9375rem;
          padding: 14px 16px;
        }

        .meta {
          grid-template-columns: 1fr;
          gap: 10px;
          margin-top: 20px;
          padding: 18px 0;
        }

        /* 모바일: 구매 버튼을 화면 하단에 고정 */
        .actions {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 40;
          margin: 0;
          gap: 8px;
          padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
          background: ${({ theme }) => theme.color.surface};
          border-top: 1px solid ${({ theme }) => theme.color.border};
          box-shadow: 0 -6px 20px -10px rgba(0, 0, 0, 0.2);
        }
      }
    }

    .tab-header {
      gap: 20px;
    }

    .tab-content {
      padding: 24px 0;
    }

    /* 하단 고정 바에 내용이 가리지 않도록 */
    padding-bottom: 72px;
  }
`;
