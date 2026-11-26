import { Theme } from '@/style/theme';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ children, isOpen, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleClose = () => {
    setIsFadingOut(true);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  const handleAnimation = () => {
    if (isFadingOut) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsFadingOut(false);
      window.addEventListener('keydown', handleKeydown);
    } else {
      window.removeEventListener('keydown', handleKeydown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <StyledModal
      className={isFadingOut ? 'fade-out' : 'fade-in'}
      onClick={handleOverlayClick}
      onAnimationEnd={handleAnimation}
    >
      <div className='modal-body' ref={modalRef}>
        <div className='modal-contents'>
          {children}
          <div className='modal-close' onClick={handleClose}>
            <FaPlus />
          </div>
        </div>
      </div>
    </StyledModal>,
    document.body
  );
}

const StyledModal = styled.div`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  &.fade-in {
    animation: fade-in 0.3s ease-in-out forwards;
  }
  &.fade-out {
    animation: fade-out 0.3s ease-in-out forwards;
  }
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  background-color: rgba(18, 17, 16, 0.55);
  backdrop-filter: blur(4px);
  opacity: 0;

  .modal-body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 48px 28px 28px;
    border-radius: ${({ theme }) => (theme as Theme).borderRadius.large};
    box-shadow: ${({ theme }) => (theme as Theme).shadow.large};
    background-color: ${({ theme }) => (theme as Theme).color.surface};
    width: min(90vw, 420px);
    max-height: 90vh;
    overflow: auto;
  }

  .modal-close {
    border: none;
    background-color: transparent;
    cursor: pointer;

    position: absolute;
    top: 0;
    right: 0;
    padding: 14px;

    svg {
      width: 18px;
      height: 18px;
      transform: rotate(45deg);
      fill: ${({ theme }) => (theme as Theme).color.muted};
    }
  }
`;
