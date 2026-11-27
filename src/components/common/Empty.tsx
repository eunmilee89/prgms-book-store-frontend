import styled from 'styled-components';
import Title from './Title';
import { Theme } from '../../style/theme';

interface Props {
  icon?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
}

export default function Empty({ icon, title, description }: Props) {
  return (
    <StyledEmpty>
      {icon && <div className='icon'>{icon}</div>}
      <Title size='medium'>{title}</Title>
      {description && <div className='description'>{description}</div>}
    </StyledEmpty>
  );
}

const StyledEmpty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 96px 24px;
  text-align: center;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72px;
    height: 72px;
    margin-bottom: 8px;
    border-radius: 50%;
    background: ${({ theme }) => (theme as Theme).color.surfaceAlt};

    svg {
      width: 28px;
      height: 28px;
      fill: ${({ theme }) => (theme as Theme).color.secondary};
    }
  }

  .description {
    font-size: 0.9375rem;
    color: ${({ theme }) => (theme as Theme).color.muted};

    a {
      display: inline-block;
      margin-top: 8px;
      font-weight: 600;
      color: ${({ theme }) => (theme as Theme).color.primary};
      text-underline-offset: 3px;
    }
  }
`;
