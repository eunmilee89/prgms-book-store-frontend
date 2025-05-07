import { Book } from '@/models/book.model';
import styled from 'styled-components';
import BookItem from '../books/BookItem';

interface Props {
  books: Book[];
}

export default function MainNewBooks({ books }: Props) {
  return (
    <StyledMainNewBooks>
      {books.map((book) => (
        <BookItem key={book.id} book={book} view='grid' />
      ))}
    </StyledMainNewBooks>
  );
}

const StyledMainNewBooks = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media ${({ theme }) => `screen and ${theme.mediaQuery.mobile}`} {
    grid-template-columns: repeat(2, 1fr);
  }
`;
