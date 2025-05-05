import { Theme } from '@/style/theme';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

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
      <button className='toggle' onClick={() => setOpen(!open)}>
        {toggleButton}
      </button>
      {open && <div className='panel'>{children}</div>}
    </StyledDropdown>
  );
}

interface StyledDropdownProps {
  $open: boolean;
}

const StyledDropdown = styled.div<StyledDropdownProps>`
  position: relative;

  button {
    background: none;
    border: none;
    cursor: pointer;
    outline: none;

    svg {
      width: 30px;
      height: 30px;
      fill: ${({ theme, $open }) =>
        $open ? (theme as Theme).color.primary : (theme as Theme).color.text};
    }
  }

  .panel {
    position: absolute;
    top: 40px;
    right: 0;
    padding: 16px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: ${({ theme }) => (theme as Theme).borderRadius.default};
    z-index: 100;
  }
`;
