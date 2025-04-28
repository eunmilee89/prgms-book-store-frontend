import { styled } from 'styled-components';
import { ButtonScheme, ButtonSize, Theme } from '../../style/theme';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size: ButtonSize;
  scheme: ButtonScheme;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  size,
  scheme,
  disabled,
  isLoading,
  onClick,
  className,
  type,
}: Props) {
  return (
    <ButtonStyle
      size={size}
      scheme={scheme}
      disabled={disabled}
      isLoading={isLoading}
      onClick={onClick}
      className={className}
      type={type}
    >
      {children}
    </ButtonStyle>
  );
}

const ButtonStyle = styled.button<Omit<Props, 'children'>>`
  font-size: ${({ theme, size }) => (theme as Theme).button[size].fontSize};
  padding: ${({ theme, size }) => (theme as Theme).button[size].padding};
  color: ${({ theme, scheme }) => (theme as Theme).buttonScheme[scheme].color};
  background-color: ${({ theme, scheme }) =>
    (theme as Theme).buttonScheme[scheme].backgroundColor};
  border: 0;
  border-radius: ${({ theme }) => (theme as Theme).borderRadius.default};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  cursor: ${({ disabled }) => (disabled ? 'none' : 'pointer')};
`;
