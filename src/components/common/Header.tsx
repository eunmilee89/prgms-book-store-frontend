import styled from 'styled-components';
import { Theme } from '@/style/theme';
import Logo from './Logo';
import {
  FaSignInAlt,
  FaRegUser,
  FaUserCircle,
  FaShoppingCart,
  FaListAlt,
  FaSignOutAlt,
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import Dropdown from './Dropdown';
import ThemeSwitcher from '../header/ThemeSwitcher';

export default function Header() {
  const location = useLocation();
  const { isLoggedIn, storeLogout } = useAuthStore();
  // 카테고리 필터는 /books 페이지에 있으므로 헤더는 진입점만 둔다
  const isNews = new URLSearchParams(location.search).has('news');
  const isBooksPage = location.pathname.startsWith('/books');
  const navItems = [
    { label: '도서', to: '/books', active: isBooksPage && !isNews },
    { label: '신간', to: '/books?news=true', active: isBooksPage && isNews },
  ];

  return (
    <HeaderStyle>
      <div className='inner'>
      <h1 className='logo'>
        <Link to='/' aria-label='Book Store 홈'>
          <Logo />
        </Link>
      </h1>
      <nav className='category' aria-label='주요 메뉴'>
        <ul>
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={item.active ? 'active' : ''}
                aria-current={item.active ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className='actions'>
        <ThemeSwitcher />
        <Dropdown toggleButton={<FaUserCircle />}>
          <ul className='menu'>
            {isLoggedIn ? (
              <>
                <li>
                  <Link to='/cart'>
                    <FaShoppingCart />
                    장바구니
                  </Link>
                </li>
                <li>
                  <Link to='/orderlist'>
                    <FaListAlt />
                    주문내역
                  </Link>
                </li>
                <li className='divider' role='separator' />
                <li>
                  <button type='button' onClick={storeLogout}>
                    <FaSignOutAlt />
                    로그아웃
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to='/login'>
                    <FaSignInAlt />
                    로그인
                  </Link>
                </li>
                <li>
                  <Link to='/signup'>
                    <FaRegUser />
                    회원가입
                  </Link>
                </li>
              </>
            )}
          </ul>
        </Dropdown>
      </div>
      </div>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  background: ${({ theme }) =>
    (theme as Theme).name === 'light'
      ? 'rgba(250, 247, 242, 0.82)'
      : 'rgba(18, 17, 16, 0.82)'};
  backdrop-filter: saturate(180%) blur(14px);
  -webkit-backdrop-filter: saturate(180%) blur(14px);
  border-bottom: 1px solid ${({ theme }) => (theme as Theme).color.border};

  .inner {
    max-width: ${({ theme }) => (theme as Theme).layout.width.large};
    height: 68px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    gap: 40px;
  }

  .logo {
    flex-shrink: 0;
    margin: 0;
    font-size: inherit;

    a {
      display: block;
      text-decoration: none;
    }
  }

  .category {
    flex: 1;

    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 2px;
      margin: 0;
      padding: 0;
      list-style: none;

      li a {
        position: relative;
        display: block;
        padding: 8px 14px;
        border-radius: ${({ theme }) => (theme as Theme).borderRadius.pill};
        font-size: 0.9375rem;
        font-weight: 600;
        text-decoration: none;
        color: ${({ theme }) => (theme as Theme).color.muted};
        transition: color 0.18s ease, background-color 0.18s ease;

        &:hover {
          color: ${({ theme }) => (theme as Theme).color.text};
          background-color: ${({ theme }) => (theme as Theme).color.hover};
        }

        &.active {
          color: ${({ theme }) => (theme as Theme).color.onPrimary};
          background-color: ${({ theme }) => (theme as Theme).color.primary};
        }
      }
    }
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  }

  .menu {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin: 0;
    padding: 0;
    list-style: none;

    .divider {
      height: 1px;
      margin: 4px 6px;
      background-color: ${({ theme }) => (theme as Theme).color.border};
    }

    a,
    button {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 10px 12px;
      border: 0;
      border-radius: 8px;
      background: none;
      font-size: 0.9rem;
      font-weight: 500;
      line-height: 1;
      text-align: left;
      text-decoration: none;
      white-space: nowrap;
      color: ${({ theme }) => (theme as Theme).color.text};
      cursor: pointer;
      transition: background-color 0.15s ease;

      svg {
        width: 15px;
        height: 15px;
        flex-shrink: 0;
        fill: ${({ theme }) => (theme as Theme).color.muted};
      }

      &:hover {
        background-color: ${({ theme }) => (theme as Theme).color.hover};

        svg {
          fill: ${({ theme }) => (theme as Theme).color.accent};
        }
      }
    }
  }

  @media ${({ theme }) => `screen and ${(theme as Theme).mediaQuery.mobile}`} {
    .inner {
      height: 56px;
      padding: 0 12px 0 16px;
      gap: 12px;
    }

    .logo .word {
      font-size: 1.1rem;
    }

    .logo svg {
      width: 24px;
      height: 24px;
    }

    .category ul li a {
      padding: 6px 10px;
      font-size: 0.875rem;
    }

    .actions {
      gap: 0;
    }
  }

  @media screen and (max-width: 340px) {
    .logo .word {
      display: none;
    }
  }
`;
