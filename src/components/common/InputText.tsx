import React, { ForwardedRef } from 'react';
import styled from 'styled-components';
import { Theme } from '../../style/theme';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  inputType?: 'text' | 'email' | 'password' | 'number';
}

const InputText = React.forwardRef(
  (
    { placeholder, inputType, onChange, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <InputTextStyle
        placeholder={placeholder}
        ref={ref}
        type={inputType}
        onChange={onChange}
        {...props}
      />
    );
  }
);

const InputTextStyle = styled.input`
  height: 44px;
  padding: 0 14px;
  border: 1px solid ${({ theme }) => (theme as Theme).color.border};
  border-radius: ${({ theme }) => (theme as Theme).borderRadius.default};
  background: ${({ theme }) => (theme as Theme).color.surface};
  font-size: 0.9375rem;
  line-height: 1.5;
  color: ${({ theme }) => (theme as Theme).color.text};
  transition: border-color 0.18s ease, box-shadow 0.18s ease;

  &::placeholder {
    color: ${({ theme }) => (theme as Theme).color.secondary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => (theme as Theme).color.primary};
    box-shadow: 0 0 0 3px
      ${({ theme }) =>
        (theme as Theme).name === 'light'
          ? 'rgba(31, 58, 52, 0.12)'
          : 'rgba(156, 199, 181, 0.18)'};
  }
`;

export default InputText;
