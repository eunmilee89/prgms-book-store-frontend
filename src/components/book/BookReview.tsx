import {
  BookReviewItemWrite,
  BookReviewItem as IBookReviewItem,
} from '@/models/book.model';
import styled from 'styled-components';
import BookReviewItem from './BookReviewItem';
import BookAddReview from './BookAddReview';

interface Props {
  reviews: IBookReviewItem[];
  onAdd: (data: BookReviewItemWrite) => void;
}

export default function BookReview({ reviews, onAdd }: Props) {
  return (
    <StyledBookReview>
      <BookAddReview onAdd={onAdd} />
      {reviews.map((review) => (
        <BookReviewItem key={review.id} review={review} />
      ))}
    </StyledBookReview>
  );
}

const StyledBookReview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
