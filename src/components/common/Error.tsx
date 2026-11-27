import { Link, useRouteError } from 'react-router-dom';
import styled from 'styled-components';
import { Theme } from '../../style/theme';

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function Error() {
  const error = useRouteError() as RouteError;

  return (
    <StyledError>
      <span className='code'>Oops!</span>
      <h1>오류가 발생했습니다.</h1>
      <p>{error.statusText || error.message}</p>
      <Link to='/'>홈으로 돌아가기</Link>
    </StyledError>
  );
}

const StyledError = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px;
  text-align: center;

  .code {
    font-family: ${({ theme }) => (theme as Theme).font.serif};
    font-size: 3rem;
    font-weight: 900;
    color: ${({ theme }) => (theme as Theme).color.accent};
  }

  h1 {
    font-size: 1.4rem;
  }

  p {
    color: ${({ theme }) => (theme as Theme).color.muted};
  }

  a {
    margin-top: 12px;
    padding: 10px 20px;
    border-radius: 999px;
    text-decoration: none;
    font-weight: 600;
    background: ${({ theme }) => (theme as Theme).color.primary};
    color: ${({ theme }) => (theme as Theme).color.onPrimary};
  }
`;
