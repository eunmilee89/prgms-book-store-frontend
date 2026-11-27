import { BookReviewItem as IBookReviewItem } from '@/models/book.model';
import { Theme } from '@/style/theme';
import { formatDate } from '@/utils/format';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

interface Props {
  review: IBookReviewItem;
}

const Star = (props: Pick<IBookReviewItem, 'score'>) => {
  return (
    <span className='star' aria-label={`${props.score}점`}>
      {Array.from({ length: 5 }, (_, index) => (
        <FaStar key={index} className={index < props.score ? 'on' : ''} />
      ))}
    </span>
  );
};

export default function BookReviewItem({ review }: Props) {
  return (
    <StyledBookReviewItem>
      <Star score={review.score} />
      <div className='content'>
        <p>{review.content}</p>
      </div>
      <footer className='footer'>
        <span className='avatar'>{review.userName.slice(0, 1)}</span>
        <div>
          <span className='name'>{review.userName}</span>
          {review.createdAt && (
            <span className='date'>
              {formatDate(review.createdAt, 'YYYY.MM.DD')}
            </span>
          )}
        </div>
      </footer>
    </StyledBookReviewItem>
  );
}

const StyledBookReviewItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  padding: 24px;
  background: ${({ theme }) => (theme as Theme).color.surface};
  border: 1px solid ${({ theme }) => (theme as Theme).color.border};
  border-radius: ${({ theme }) => (theme as Theme).borderRadius.large};

  .star {
    display: inline-flex;
    gap: 2px;

    svg {
      width: 14px;
      height: 14px;
      fill: ${({ theme }) => (theme as Theme).color.border};

      &.on {
        fill: #e9a23b;
      }
    }
  }

  .content {
    flex: 1;

    p {
      font-size: 0.9375rem;
      line-height: 1.7;
      color: ${({ theme }) => (theme as Theme).color.text};
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      word-break: keep-all;
    }
  }

  .footer {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-top: 16px;
    border-top: 1px solid ${({ theme }) => (theme as Theme).color.border};

    .avatar {
      width: 32px;
      height: 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-size: 0.8125rem;
      font-weight: 700;
      background: ${({ theme }) => (theme as Theme).color.primary};
      color: ${({ theme }) => (theme as Theme).color.onPrimary};
    }

    div {
      display: flex;
      flex-direction: column;
      line-height: 1.3;
    }

    .name {
      font-size: 0.875rem;
      font-weight: 600;
    }

    .date {
      font-size: 0.75rem;
      color: ${({ theme }) => (theme as Theme).color.secondary};
    }
  }
`;
