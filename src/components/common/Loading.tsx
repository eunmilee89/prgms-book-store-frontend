import styled from 'styled-components';
import { Theme } from '../../style/theme';

export default function Loading() {
  return (
    <StyledLoading role='status' aria-label='불러오는 중'>
      <span />
      <span />
      <span />
    </StyledLoading>
  );
}

const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 96px 0;

  @keyframes loading-bounce {
    0%,
    80%,
    100% {
      transform: scale(0.6);
      opacity: 0.35;
    }
    40% {
      transform: scale(1);
      opacity: 1;
    }
  }

  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${({ theme }) => (theme as Theme).color.primary};
    animation: loading-bounce 1.2s ease-in-out infinite;

    &:nth-child(2) {
      animation-delay: 0.15s;
    }
    &:nth-child(3) {
      animation-delay: 0.3s;
    }
  }
`;
