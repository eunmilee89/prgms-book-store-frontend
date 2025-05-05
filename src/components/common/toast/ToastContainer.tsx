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
  top: 32px;
  right: 24px;
  z-index: 100;

  display: flex;
  flex-direction: column;
  gap: 12px;
`;
