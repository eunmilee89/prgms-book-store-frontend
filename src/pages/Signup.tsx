import styled from 'styled-components';
import Title from '../components/common/Title';
import InputText from '../components/common/InputText';
import Button from '../components/common/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Theme } from '../style/theme';
import { useForm } from 'react-hook-form';
import { signup } from '../api/auth.api';
import { useAlert } from '../hooks/useAlert';

export interface SignUpProps {
  email: string;
  password: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const showAlert = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpProps>();

  const onSubmit = (data: SignUpProps) => {
    signup(data).then((data) => {
      showAlert('회원가입이 완료되었습니다.');
      navigate('/login');
    });
  };

  return (
    <>
      <Title size='large'>회원가입</Title>
      <StyledSignup>
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
            <Link to='/reset'>비밀번호 초기화</Link>
          </div>
        </form>
      </StyledSignup>
    </>
  );
}

const StyledSignup = styled.div<{ theme: Theme }>`
  max-width: ${({ theme }) => theme.layout.width.small};
  margin: 80px auto;

  fieldset {
    border: 0;
    padding: 0 0 8px 0;
    .error-text {
      color: red;
    }
  }

  input {
    width: 100%;
  }

  button {
    width: 100%;
  }

  .info {
    text-align: center;
    padding: 16px 0 0 0;
  }
`;
