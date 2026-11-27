import styled from 'styled-components';
import { Theme } from '@/style/theme';

interface Props {
  size?: 'medium' | 'small';
}

export default function Logo({ size = 'medium' }: Props) {
  return (
    <StyledLogo $size={size}>
      <svg viewBox='0 0 32 32' aria-hidden='true'>
        <rect x='3' y='5' width='8' height='22' rx='1.5' className='b1' />
        <rect x='12.5' y='8' width='7' height='19' rx='1.5' className='b2' />
        <rect
          x='21'
          y='6'
          width='7'
          height='21'
          rx='1.5'
          className='b3'
          transform='rotate(10 24.5 16.5)'
        />
      </svg>
      <span className='word'>
        Book<em>Store</em>
      </span>
    </StyledLogo>
  );
}

const StyledLogo = styled.span<{ $size: 'medium' | 'small' }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;

  svg {
    width: ${({ $size }) => ($size === 'medium' ? '30px' : '24px')};
    height: ${({ $size }) => ($size === 'medium' ? '30px' : '24px')};

    .b1 {
      fill: ${({ theme }) => (theme as Theme).color.primary};
    }
    .b2 {
      fill: ${({ theme }) => (theme as Theme).color.accent};
    }
    .b3 {
      fill: #e9c46a;
    }
  }

  .word {
    font-family: ${({ theme }) => (theme as Theme).font.serif};
    font-size: ${({ $size }) => ($size === 'medium' ? '1.35rem' : '1.1rem')};
    font-weight: 900;
    letter-spacing: -0.03em;
    color: ${({ theme }) => (theme as Theme).color.text};

    em {
      font-style: normal;
      color: ${({ theme }) => (theme as Theme).color.accent};
    }
  }
`;
