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
      $size={size}
      $scheme={scheme}
      $isLoading={isLoading}
      disabled={disabled}
      onClick={onClick}
      className={className}
      type={type}
    >
      {children}
    </ButtonStyle>
  );
}

interface ButtonStyleProps {
  $size: ButtonSize;
  $scheme: ButtonScheme;
  $isLoading?: boolean;
}

type ButtonStyleArgs = ButtonStyleProps & { theme: Theme };

const ButtonStyle = styled.button<ButtonStyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: ${({ theme, $size }: ButtonStyleArgs) =>
    theme.button[$size].fontSize};
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
  padding: ${({ theme, $size }: ButtonStyleArgs) =>
    theme.button[$size].padding};
  color: ${({ theme, $scheme }: ButtonStyleArgs) =>
    theme.buttonScheme[$scheme].color};
  background-color: ${({ theme, $scheme }: ButtonStyleArgs) =>
    theme.buttonScheme[$scheme].backgroundColor};
  border: 1px solid
    ${({ theme, $scheme }: ButtonStyleArgs) =>
      theme.buttonScheme[$scheme].border};
  border-radius: ${({ theme }) => (theme as Theme).borderRadius.default};
  opacity: ${({ disabled }) => (disabled ? 0.45 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  white-space: nowrap;
  transition: background-color 0.18s ease, border-color 0.18s ease,
    transform 0.1s ease, box-shadow 0.18s ease;

  svg {
    fill: currentColor;
    color: currentColor;
  }

  &:hover {
    background-color: ${({ theme, $scheme }: ButtonStyleArgs) =>
      theme.buttonScheme[$scheme].hoverBackgroundColor};
  }

  &:active {
    transform: translateY(1px);
  }
`;
