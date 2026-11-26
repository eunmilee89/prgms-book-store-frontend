import styled from 'styled-components';
import Footer from '../common/Footer';
import Header from '../common/Header';
import { Theme } from '../../style/theme';

// React Node > React Element > JSX Element
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <LayoutStyle>{children}</LayoutStyle>
      <Footer />
    </>
  );
}

const LayoutStyle = styled.main<{ theme: Theme }>`
  width: 100%;
  min-height: calc(100vh - 68px - 220px);
  margin: 0 auto;
  padding: 40px 24px 0;
  max-width: ${({ theme }) => theme.layout.width.large};

  @media ${({ theme }) => `screen and ${theme.mediaQuery.mobile}`} {
    padding: 24px 16px 0;
  }
`;
