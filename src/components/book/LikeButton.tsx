import styled from 'styled-components';
import { BookDetail } from '../../models/book.model';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Theme } from '../../style/theme';

interface Props {
  book: BookDetail;
  onClick: () => void;
}

export default function LikeButton({ book, onClick }: Props) {
  return (
    <StyledLikeButton
      type='button'
      $liked={book.liked}
      onClick={onClick}
      aria-pressed={book.liked}
      aria-label='좋아요'
    >
      {book.liked ? <FaHeart /> : <FaRegHeart />}
      <span>{book.likes}</span>
    </StyledLikeButton>
  );
}

const StyledLikeButton = styled.button<{ $liked: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 48px;
  min-width: 72px;
  padding: 0 16px;
  border: 1px solid
    ${({ theme, $liked }) =>
      $liked ? (theme as Theme).color.accent : (theme as Theme).color.border};
  border-radius: ${({ theme }) => (theme as Theme).borderRadius.default};
  background: ${({ theme }) => (theme as Theme).color.surface};
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ theme, $liked }) =>
    $liked ? (theme as Theme).color.accent : (theme as Theme).color.text};
  cursor: pointer;
  transition: all 0.18s ease;

  svg {
    width: 16px;
    height: 16px;
    fill: ${({ theme }) => (theme as Theme).color.accent};
    transition: transform 0.2s ease;
  }

  &:hover {
    border-color: ${({ theme }) => (theme as Theme).color.accent};

    svg {
      transform: scale(1.15);
    }
  }

  @media ${({ theme }) => `screen and ${(theme as Theme).mediaQuery.mobile}`} {
    flex-shrink: 0;
    min-width: 0;
    padding: 0 14px;
  }
`;
