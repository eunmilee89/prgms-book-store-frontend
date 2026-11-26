import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Theme } from '../../style/theme';
import Logo from './Logo';

export default function Footer() {
  return (
    <FooterStyle>
      <div className='inner'>
        <div className='brand'>
          <Logo size='small' />
          <p>오늘 읽을 한 권을 고르는 가장 편안한 방법.</p>
        </div>
        <nav className='links'>
          <Link to='/books'>전체 도서</Link>
          <Link to='/books?news=true'>신간</Link>
          <Link to='/cart'>장바구니</Link>
          <Link to='/orderlist'>주문내역</Link>
        </nav>
      </div>
      <div className='inner bottom'>
        <p>© {new Date().getFullYear()} Book Store. All rights reserved.</p>
      </div>
    </FooterStyle>
  );
}

const FooterStyle = styled.footer<{ theme: Theme }>`
  margin-top: 96px;
  border-top: 1px solid ${({ theme }) => theme.color.border};
  background: ${({ theme }) => theme.color.surfaceAlt};

  .inner {
    max-width: ${({ theme }) => theme.layout.width.large};
    margin: 0 auto;
    padding: 40px 24px 24px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 24px;
  }

  .brand p {
    margin-top: 10px;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.color.muted};
  }

  .links {
    display: flex;
    gap: 20px;

    a {
      font-size: 0.875rem;
      font-weight: 500;
      text-decoration: none;
      color: ${({ theme }) => theme.color.muted};
      transition: color 0.15s ease;

      &:hover {
        color: ${({ theme }) => theme.color.text};
      }
    }
  }

  .bottom {
    padding-top: 16px;
    padding-bottom: 32px;
    border-top: 1px solid ${({ theme }) => theme.color.border};

    p {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.color.secondary};
    }
  }

  @media ${({ theme }) => `screen and ${theme.mediaQuery.mobile}`} {
    margin-top: 64px;

    .inner {
      flex-direction: column;
      padding: 32px 16px 20px;
    }

    .links {
      flex-wrap: wrap;
      gap: 12px 18px;
    }

    .bottom {
      padding-top: 16px;
    }
  }
`;
