import styled from 'styled-components';
import BookItem from './BookItem';
import { Book } from '../../models/book.model';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { QUERYSTRING } from '../../constants/querystring';
import { ViewMode } from './BooksViewSwitcher';

interface Props {
  books: Book[];
}

export default function BooksList({ books }: Props) {
  const [view, setView] = useState<ViewMode>('grid');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get(QUERYSTRING.VIEW)) {
      setView(params.get(QUERYSTRING.VIEW) as ViewMode);
    }
  }, [location.search]);

  return (
    <StyledBooksList view={view}>
      {books.map((item) => (
        <BookItem key={item.id} book={item} view={view} />
      ))}
    </StyledBooksList>
  );
}

interface BooksListStyleProps {
  view: ViewMode;
}

const StyledBooksList = styled.div<BooksListStyleProps>`
  display: grid;
  grid-template-columns: ${({ view }) =>
    view === 'grid' ? 'repeat(4, 1fr)' : 'repeat(1, 1fr)'};
  gap: 24px;
`;
