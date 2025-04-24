import React from 'react';
import { render, screen } from '@testing-library/react';
import BookItem from './BookItem';
import { BookStoreThemeProvider } from '../../context/ThemeContext';

const dummyBook = {
  id: 1,
  title: 'Dummy Book',
  img: 5,
  category_id: 1,
  form: 'paperback',
  isbn: 'Dummy ISBN',
  summary: 'Dummy Summary',
  detail: 'Dummy Detail',
  author: 'Dummy author',
  pages: 100,
  contents: 'Dummy contents',
  price: 10000,
  likes: 1,
  pubDate: '2021-01-01',
};

describe('BookItem 컴포넌트 테스트', () => {
  it('렌더링 확인', () => {
    const { getByText } = render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook} />
      </BookStoreThemeProvider>
    );

    expect(screen.getByText(dummyBook.title)).toBeInTheDocument();
    expect(screen.getByText(dummyBook.summary)).toBeInTheDocument();
    expect(screen.getByText(dummyBook.author)).toBeInTheDocument();
    expect(screen.getByText('10,000원')).toBeInTheDocument();
    expect(screen.getByText(dummyBook.likes)).toBeInTheDocument();
    expect(screen.getByAltText(dummyBook.title)).toHaveAttribute(
      'src',
      `https://picsum.photos/id/${dummyBook.img}/600/600`
    );
  });
});
