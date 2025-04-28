import { FaRegCheckCircle, FaRegCircle } from 'react-icons/fa';
import styled from 'styled-components';

interface Props {
  isChecked: boolean;
  onCheck: () => void;
}

export default function CheckIconButton({ isChecked, onCheck }: Props) {
  return (
    <StyledCheckIconButton onClick={onCheck}>
      {isChecked ? <FaRegCheckCircle /> : <FaRegCircle />}
    </StyledCheckIconButton>
  );
}

const StyledCheckIconButton = styled.button`
  background: none;
  border: 0;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`;
