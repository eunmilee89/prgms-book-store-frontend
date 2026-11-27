import styled from 'styled-components';
import Title from '../components/common/Title';
import InputText from '../components/common/InputText';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';
import { Theme } from '../style/theme';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/hooks/useAuth';

export interface SignUpProps {
  email: string;
  password: string;
}

export default function Signup() {
  const { userSignup } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpProps>();

  const onSubmit = (data: SignUpProps) => {
    userSignup(data);
  };

  return (
    <>
      <StyledSignup>
        <div className='head'>
          <Title size='large'>회원가입</Title>
          <p>이메일 하나로 간단하게 시작해보세요.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder='이메일'
              inputType='email'
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className='error-text'>이메일을 입력해주세요.</p>
            )}
          </fieldset>
          <fieldset>
            <InputText
              placeholder='비밀번호'
              inputType='password'
              {...register('password', { required: true })}
            />
            {errors.password && (
              <p className='error-text'>비밀번호를 입력해주세요.</p>
            )}
          </fieldset>
          <fieldset>
            <Button type='submit' size='medium' scheme='primary'>
              회원가입
            </Button>
          </fieldset>
          <div className='info'>
            이미 계정이 있으신가요?
            <Link to='/login'>로그인</Link>
          </div>
        </form>
      </StyledSignup>
    </>
  );
}

export const StyledSignup = styled.div<{ theme: Theme }>`
  max-width: ${({ theme }) => theme.layout.width.small};
  margin: 40px auto 0;
  padding: 44px 40px 36px;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  background: ${({ theme }) => theme.color.surface};
  box-shadow: ${({ theme }) => theme.shadow.medium};

  .head {
    margin-bottom: 28px;
    text-align: center;

    h1 {
      font-size: 1.75rem;
    }

    p {
      margin-top: 8px;
      font-size: 0.9rem;
      color: ${({ theme }) => theme.color.muted};
      word-break: keep-all;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  fieldset {
    border: 0;
    margin: 0;
    padding: 0;

    .error-text {
      margin: 6px 0 0 2px;
      font-size: 0.8125rem;
      color: ${({ theme }) => theme.color.danger};
    }
  }

  input {
    width: 100%;
    height: 48px;
  }

  button {
    width: 100%;
    height: 50px;
    margin-top: 8px;
  }

  .info {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 16px 0 0 0;
    font-size: 0.875rem;
    color: ${({ theme }) => theme.color.muted};

    a {
      font-weight: 600;
      color: ${({ theme }) => theme.color.text};
      text-decoration: none;

      &:hover {
        text-decoration: underline;
        text-underline-offset: 3px;
      }
    }

    .dot {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: ${({ theme }) => theme.color.border};
    }
  }

  @media ${({ theme }) => `screen and ${theme.mediaQuery.mobile}`} {
    margin-top: 16px;
    padding: 32px 22px 28px;
  }
`;
