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
  gap: 40px 28px;
  padding: 36px;
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background: ${({ theme }) => theme.color.surfaceAlt};

  @media ${({ theme }) => `screen and ${theme.mediaQuery.mobile}`} {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px 16px;
    padding: 20px;
  }
`;
