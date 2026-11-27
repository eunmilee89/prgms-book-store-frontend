import { Book } from '@/models/book.model';
import styled from 'styled-components';
import BookItem, { StyledBookItem } from './BookItem';
import { Theme } from '@/style/theme';

interface Props {
  book: Book;
  itemIndex: number;
}

export default function BookBestItem({ book, itemIndex }: Props) {
  return (
    <StyledBookBestItem $top={itemIndex < 3}>
      <BookItem book={book} view='grid' />
      <div className='rank'>{itemIndex + 1}</div>
    </StyledBookBestItem>
  );
}

const StyledBookBestItem = styled.div<{ $top: boolean }>`
  ${StyledBookItem} {
    .summary,
    .price,
    .likes {
      display: none;
    }

    .cover-text {
      padding-right: 34%;
    }
  }

  position: relative;

  .rank {
    position: absolute;
    top: 0;
    right: 10px;
    min-width: 30px;
    height: 38px;
    padding: 4px 6px 0;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background: ${({ theme, $top }) =>
      $top ? (theme as Theme).color.accent : (theme as Theme).color.text};
    color: ${({ theme, $top }) =>
      $top ? '#fff' : (theme as Theme).color.background};
    font-family: ${({ theme }) => (theme as Theme).font.serif};
    font-size: 1rem;
    font-weight: 900;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%);
    box-shadow: ${({ theme }) => (theme as Theme).shadow.small};
    pointer-events: none;
    transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  &:hover .rank {
    transform: translateY(-6px);
  }
`;
