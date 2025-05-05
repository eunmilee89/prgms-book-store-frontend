import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import styled from 'styled-components';
import { Theme } from '@/style/theme';

export default function ThemeSwitcher() {
  const { themeName, toggleTheme } = useContext(ThemeContext);

  return (
    <StyledThemeSwitcher onClick={toggleTheme}>{themeName}</StyledThemeSwitcher>
  );
}

const StyledThemeSwitcher = styled.button`
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  line-height: 1;
  background: none;
  border: 0;
  cursor: pointer;
`;
