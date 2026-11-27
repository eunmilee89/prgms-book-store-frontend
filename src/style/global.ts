import 'sanitize.css';
import { createGlobalStyle } from 'styled-components';
import { Theme, ThemeName } from './theme';

interface Props {
  themeName: ThemeName;
}

export const GlobalStyle = createGlobalStyle<Props>`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
  }

  body {
    padding: 0;
    margin: 0;
    font-family: ${({ theme }) => (theme as Theme).font.sans};
    font-size: 15px;
    line-height: 1.6;
    letter-spacing: -0.01em;
    color: ${({ theme }) => (theme as Theme).color.text};
    background-color: ${({ theme }) => (theme as Theme).color.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.25s ease, color 0.25s ease;
  }

  h1, h2, h3, h4, p, dl, dd {
    margin: 0;
  }

  a {
    color: inherit;
  }

  img {
    display: block;
    max-width: 100%;
  }

  button, input, select, textarea {
    font-family: inherit;
    color: inherit;
  }

  ::selection {
    background: ${({ theme }) => (theme as Theme).color.primary};
    color: ${({ theme }) => (theme as Theme).color.onPrimary};
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => (theme as Theme).color.primary};
    outline-offset: 2px;
  }
`;
