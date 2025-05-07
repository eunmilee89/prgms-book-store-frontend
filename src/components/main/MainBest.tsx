import { Book } from '@/models/book.model';
import styled from 'styled-components';
import BookBestItem from '../books/BookBestItem';

interface Props {
  books: Book[];
}

export default function MainBest({ books }: Props) {
  return (
    <StyledMainBest>
      {books.map((item, index) => (
        <BookBestItem key={item.id} book={item} itemIndex={index} />
      ))}
    </StyledMainBest>
  );
}

const StyledMainBest = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;

  @media ${({ theme }) => `screen and ${theme.mediaQuery.mobile}`} {
    grid-template-columns: repeat(2, 1fr);
  }
`;
