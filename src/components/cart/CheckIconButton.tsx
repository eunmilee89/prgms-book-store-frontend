import { FaCheck } from 'react-icons/fa';
import styled from 'styled-components';
import { Theme } from '../../style/theme';

interface Props {
  isChecked: boolean;
  onCheck: () => void;
  label?: string;
}

export default function CheckIconButton({ isChecked, onCheck, label }: Props) {
  return (
    <StyledCheckIconButton
      type='button'
      role='checkbox'
      aria-checked={isChecked}
      aria-label={label ?? '선택'}
      $checked={isChecked}
      onClick={onCheck}
    >
      <FaCheck />
    </StyledCheckIconButton>
  );
}

const StyledCheckIconButton = styled.button<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border-radius: 6px;
  border: 1.5px solid
    ${({ theme, $checked }) =>
      $checked ? (theme as Theme).color.primary : (theme as Theme).color.border};
  background: ${({ theme, $checked }) =>
    $checked ? (theme as Theme).color.primary : (theme as Theme).color.surface};
  cursor: pointer;
  transition: all 0.15s ease;

  svg {
    width: 11px;
    height: 11px;
    fill: ${({ theme }) => (theme as Theme).color.onPrimary};
    opacity: ${({ $checked }) => ($checked ? 1 : 0)};
    transform: scale(${({ $checked }) => ($checked ? 1 : 0.5)});
    transition: all 0.15s ease;
  }
`;
