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

  background-color: ${({ theme }) => theme.color.secondary};
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.default};

  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 24px;

  p {
    color: ${({ theme }) => theme.color.text};
    line-height: 1;
    margin: 0;
    flex: 1;

    display: flex;
    align-items: end;
    gap: 4px;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;

    svg {
      transform: rotate(45deg);
    }
  }
`;
