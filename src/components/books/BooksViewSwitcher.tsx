import styled from 'styled-components';
import { Theme } from '../../style/theme';
import { FaList, FaTh } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { QUERYSTRING } from '../../constants/querystring';
import { useEffect } from 'react';

const viewOptions = [
  {
    value: 'list',
    icon: <FaList />,
  },
  {
    value: 'grid',
    icon: <FaTh />,
  },
];

export type ViewMode = 'grid' | 'list';

export default function BooksViewSwitcher() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSwitch = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(QUERYSTRING.VIEW, value);

    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    if (!searchParams.get(QUERYSTRING.VIEW)) {
      handleSwitch('grid');
    }
  }, []);

  return (
    <StyledBooksViewSwitcher>
      {viewOptions.map((option) => (
        <button
          type='button'
          key={option.value}
          aria-label={option.value === 'grid' ? '그리드 보기' : '리스트 보기'}
          className={
            searchParams.get(QUERYSTRING.VIEW) === option.value ? 'active' : ''
          }
          onClick={() => handleSwitch(option.value)}
        >
          {option.icon}
        </button>
      ))}
    </StyledBooksViewSwitcher>
  );
}

const StyledBooksViewSwitcher = styled.div`
  display: inline-flex;
  padding: 3px;
  gap: 2px;
  border-radius: ${({ theme }) => (theme as Theme).borderRadius.default};
  background: ${({ theme }) => (theme as Theme).color.surfaceAlt};

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 30px;
    padding: 0;
    border: 0;
    border-radius: 7px;
    background: transparent;
    cursor: pointer;
    transition: background-color 0.15s ease;

    svg {
      width: 14px;
      height: 14px;
      fill: ${({ theme }) => (theme as Theme).color.secondary};
    }

    &.active {
      background: ${({ theme }) => (theme as Theme).color.surface};
      box-shadow: ${({ theme }) => (theme as Theme).shadow.small};

      svg {
        fill: ${({ theme }) => (theme as Theme).color.text};
      }
    }
  }
`;
