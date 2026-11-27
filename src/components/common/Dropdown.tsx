import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Theme } from '@/style/theme';

interface Props {
  children: React.ReactNode;
  toggleButton: React.ReactNode;
  isOpen?: boolean;
}

export default function Dropdown({
  children,
  toggleButton,
  isOpen = false,
}: Props) {
  const [open, setOpen] = useState(isOpen);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <StyledDropdown $open={open} ref={dropdownRef}>
      <button
        type='button'
        className='toggle'
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {toggleButton}
      </button>
      {open && (
        <div className='panel' onClick={() => setOpen(false)}>
          {children}
        </div>
      )}
    </StyledDropdown>
  );
}

interface StyledDropdownProps {
  $open: boolean;
}

const StyledDropdown = styled.div<StyledDropdownProps>`
  position: relative;

  .toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: ${({ theme, $open }) => ($open ? (theme as Theme).color.hover : 'none')};
    cursor: pointer;
    transition: background-color 0.2s ease;

    svg {
      width: 24px;
      height: 24px;
      fill: ${({ theme, $open }) =>
        $open ? (theme as Theme).color.accent : (theme as Theme).color.text};
      transition: fill 0.2s ease;
    }

    &:hover {
      background-color: ${({ theme }) => (theme as Theme).color.hover};

      svg {
        fill: ${({ theme }) => (theme as Theme).color.accent};
      }
    }
  }

  .panel {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    min-width: 168px;
    padding: 6px;
    background: ${({ theme }) => (theme as Theme).color.surface};
    border: 1px solid ${({ theme }) => (theme as Theme).color.border};
    border-radius: 12px;
    box-shadow: ${({ theme }) => (theme as Theme).shadow.large};
    z-index: 100;
    animation: dropdown-fade 0.15s ease-out;
  }

  @keyframes dropdown-fade {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
