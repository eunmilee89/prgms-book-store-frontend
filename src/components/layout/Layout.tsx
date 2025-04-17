import Footer from '../common/Footer';
import Header from '../common/Header';

// React Node > React Element > JSX Element
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
