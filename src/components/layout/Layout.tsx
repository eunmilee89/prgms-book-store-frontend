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
    <LayoutStyle>
      <Header />
      <main>{children}</main>
      <Footer />
    </LayoutStyle>
  );
}

const LayoutStyle = styled.main<{ theme: Theme }>`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  padding: 20px 0;
`;
