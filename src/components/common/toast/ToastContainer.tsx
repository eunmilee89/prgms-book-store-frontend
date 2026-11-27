import useToastStore from '@/store/toastStore';
import styled from 'styled-components';
import Toast from './Toast';

export default function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);
  return (
    <StyledToastContainer>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
        />
      ))}
    </StyledToastContainer>
  );
}

const StyledToastContainer = styled.div`
  position: fixed;
  top: 84px;
  right: 24px;
  z-index: 1100;

  display: flex;
  flex-direction: column;
  gap: 12px;

  @media ${({ theme }) => `screen and ${theme.mediaQuery.mobile}`} {
    top: 68px;
    left: 16px;
    right: 16px;

    > div {
      min-width: 0;
      max-width: none;
    }
  }
`;
