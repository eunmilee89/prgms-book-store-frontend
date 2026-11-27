import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import styled from 'styled-components';
import { Theme } from '@/style/theme';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function ThemeSwitcher() {
  const { themeName, toggleTheme } = useContext(ThemeContext);
  const isDark = themeName === 'dark';
  const label = isDark ? '라이트 모드로 전환' : '다크 모드로 전환';

  return (
    <StyledThemeSwitcher
      type='button'
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </StyledThemeSwitcher>
  );
}

const StyledThemeSwitcher = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  svg {
    width: 20px;
    height: 20px;
    fill: ${({ theme }) => (theme as Theme).color.text};
    transition: fill 0.2s ease;
  }

  &:hover {
    background-color: ${({ theme }) => (theme as Theme).color.hover};

    svg {
      fill: ${({ theme }) => (theme as Theme).color.accent};
    }
  }
`;
