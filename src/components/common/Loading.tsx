import { FaSpinner } from 'react-icons/fa';
import styled from 'styled-components';

export default function Loading() {
  return (
    <StyledLoading>
      <FaSpinner />
    </StyledLoading>
  );
}

const StyledLoading = styled.div`
  padding: 40px 0;
  text-align: center;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  svg {
    width: 70px;
    height: 70px;
    fill: #eee;
    animation: rotate 1s linear infinite;
  }
`;
