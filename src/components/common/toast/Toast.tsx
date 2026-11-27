import { useTimeout } from '@/hooks/useTimeout';
import useToastStore, { ToastItem } from '@/store/toastStore';
import { Theme } from '@/style/theme';
import { useState } from 'react';
import { FaBan, FaInfoCircle, FaPlus } from 'react-icons/fa';
import styled from 'styled-components';

export const TOAST_REMOVE_DELAY = 3000;

export default function Toast({ id, message, type }: ToastItem) {
  const removeToast = useToastStore((state) => state.removeToast);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleRemoveToast = () => {
    setIsFadingOut(true);
  };

  const handleAnimation = () => {
    if (isFadingOut) {
      removeToast(id);
    }
  };

  useTimeout(() => {
    setIsFadingOut(true);
  }, TOAST_REMOVE_DELAY);

  return (
    <StyledToast
      className={isFadingOut ? 'fade-out' : 'fade-in'}
      onAnimationEnd={handleAnimation}
    >
      {type === 'info' && <FaInfoCircle />}
      {type === 'error' && <FaBan />}
      <p>{message}</p>
      <button onClick={handleRemoveToast}>
        <FaPlus />
      </button>
    </StyledToast>
  );
}

const StyledToast = styled.div<{ theme: Theme }>`
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

  min-width: 280px;
  max-width: 360px;
  padding: 14px 16px;
  background-color: ${({ theme }) => theme.color.text};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  box-shadow: ${({ theme }) => theme.shadow.large};

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  > svg {
    flex-shrink: 0;
    fill: ${({ theme }) => theme.color.background};
    opacity: 0.8;
  }

  p {
    color: ${({ theme }) => theme.color.background};
    font-size: 0.9rem;
    line-height: 1.4;
    margin: 0;
    flex: 1;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;

    svg {
      transform: rotate(45deg);
      fill: ${({ theme }) => theme.color.background};
      opacity: 0.6;
    }
  }
`;
