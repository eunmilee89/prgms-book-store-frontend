import { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { FaAngleDown } from 'react-icons/fa';
import { Theme } from '../../style/theme';

interface Props {
  children: React.ReactNode;
  lineLimit: number;
}

export default function EllipsisBox({ children, lineLimit }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <StyledEllipsisBox lineLimit={lineLimit} $expanded={expanded}>
      <p>{children}</p>
      <div className='toggle'>
        <Button
          size='small'
          scheme='normal'
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? '접기' : '펼치기'} <FaAngleDown />
        </Button>
      </div>
    </StyledEllipsisBox>
  );
}

interface EllipsisBoxStyleProps {
  lineLimit: number;
  $expanded: boolean;
}

const StyledEllipsisBox = styled.div<EllipsisBoxStyleProps>`
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${({ lineLimit, $expanded }) =>
      $expanded ? 'none' : lineLimit};
    -webkit-box-orient: vertical;
    padding: 16px 0 0 0;
    margin: 0;
    font-size: 1rem;
    line-height: 1.85;
    color: ${({ theme }) => (theme as Theme).color.text};
  }

  .toggle {
    display: flex;
    justify-content: flex-start;
    padding-top: 12px;

    svg {
      width: 12px;
      height: 12px;
      transition: transform 0.2s ease;
      transform: ${({ $expanded }) =>
        $expanded ? 'rotate(180deg)' : 'rotate(0)'};
    }
  }
`;
