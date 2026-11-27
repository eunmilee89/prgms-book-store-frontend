import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { Theme } from '@/style/theme';
import Title from '../common/Title';

interface Props {
  eyebrow: string;
  title: string;
  moreLink?: string;
}

export default function SectionHeader({ eyebrow, title, moreLink }: Props) {
  return (
    <StyledSectionHeader>
      <div>
        <span className='eyebrow'>{eyebrow}</span>
        <Title size='large'>{title}</Title>
      </div>
      {moreLink && (
        <Link to={moreLink} className='more'>
          전체보기 <FaArrowRight />
        </Link>
      )}
    </StyledSectionHeader>
  );
}

const StyledSectionHeader = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 28px;

  .eyebrow {
    display: block;
    margin-bottom: 6px;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${({ theme }) => (theme as Theme).color.accent};
  }

  h1 {
    font-size: 1.75rem;
  }

  .more {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    color: ${({ theme }) => (theme as Theme).color.muted};
    transition: color 0.15s ease, gap 0.2s ease;

    svg {
      width: 11px;
      height: 11px;
      fill: currentColor;
    }

    &:hover {
      gap: 10px;
      color: ${({ theme }) => (theme as Theme).color.text};
    }
  }

  @media ${({ theme }) => `screen and ${(theme as Theme).mediaQuery.mobile}`} {
    margin-bottom: 20px;

    h1 {
      font-size: 1.35rem;
    }
  }
`;
