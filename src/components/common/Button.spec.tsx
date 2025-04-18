import { render, screen } from '@testing-library/react';
import Button from './Button';
import { BookStoreThemeProvider } from '../../context/ThemeContext';

describe('Button 컴포넌트 테스트', () => {
  it('렌더링 확인', () => {
    render(
      <BookStoreThemeProvider>
        <Button size='large' scheme='primary'>
          버튼
        </Button>
      </BookStoreThemeProvider>
    );

    expect(screen.getByText('버튼')).toBeInTheDocument();
  });

  it('font size 확인', () => {
    render(
      <BookStoreThemeProvider>
        <Button size='large' scheme='primary'>
          버튼
        </Button>
      </BookStoreThemeProvider>
    );

    expect(screen.getByRole('button')).toHaveStyle({ fontSize: '1.5rem' });
  });

  it('scheme color 확인', () => {
    render(
      <BookStoreThemeProvider>
        <Button size='large' scheme='primary'>
          버튼
        </Button>
      </BookStoreThemeProvider>
    );

    expect(screen.getByRole('button')).toHaveStyle({ color: 'white' });
  });
});
