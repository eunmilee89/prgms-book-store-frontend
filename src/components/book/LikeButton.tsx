import styled from 'styled-components';
import { BookDetail } from '../../models/book.model';
import Button from '../common/Button';
import { FaHeart } from 'react-icons/fa';

interface Props {
  book: BookDetail;
  onClick: () => void;
}

export default function LikeButton({ book, onClick }: Props) {
  return (
    <StyledLikeButton
      size='medium'
      scheme={book.liked ? 'like' : 'normal'}
      onClick={onClick}
    >
      <FaHeart />
      {book.likes}
    </StyledLikeButton>
  );
}

const StyledLikeButton = styled(Button)`
  display: flex;
  gap: 6px;

  svg {
    color: inherit;
    * {
      color: inherit;
    }
  }
`;
