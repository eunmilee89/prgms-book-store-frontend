import { BookReviewItemWrite } from '@/models/book.model';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Button from '../common/Button';
import { Theme } from '@/style/theme';

interface Props {
  onAdd: (data: BookReviewItemWrite) => void;
}

export default function BookAddReview({ onAdd }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookReviewItemWrite>();

  return (
    <StyledBookAddReview>
      <form onSubmit={handleSubmit(onAdd)}>
        <fieldset>
          <textarea
            placeholder='이 책에 대한 생각을 남겨주세요.'
            {...register('content', { required: true })}
          ></textarea>
          {errors.content && (
            <p className='error-text'>리뷰 내용을 입력해주세요.</p>
          )}
        </fieldset>

        <div className='submit'>
          <fieldset>
            <select
              defaultValue='5'
              aria-label='평점'
              {...register('score', { required: true, valueAsNumber: true })}
            >
              <option value='5'>★★★★★ 5점</option>
              <option value='4'>★★★★ 4점</option>
              <option value='3'>★★★ 3점</option>
              <option value='2'>★★ 2점</option>
              <option value='1'>★ 1점</option>
            </select>
          </fieldset>
          <Button size='medium' scheme='primary'>
            작성하기
          </Button>
        </div>
      </form>
    </StyledBookAddReview>
  );
}

const StyledBookAddReview = styled.div`
  padding: 20px;
  border-radius: ${({ theme }) => (theme as Theme).borderRadius.large};
  background: ${({ theme }) => (theme as Theme).color.surfaceAlt};

  form {
    display: flex;
    flex-direction: column;
    gap: 12px;

    fieldset {
      border: 0;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 8px;

      .error-text {
        font-size: 0.8125rem;
        color: ${({ theme }) => (theme as Theme).color.danger};
        padding: 0;
        margin: 0;
      }
    }

    textarea {
      width: 100%;
      height: 110px;
      resize: vertical;
      border: 1px solid ${({ theme }) => (theme as Theme).color.border};
      border-radius: ${({ theme }) => (theme as Theme).borderRadius.default};
      background: ${({ theme }) => (theme as Theme).color.surface};
      padding: 14px;
      font-size: 0.9375rem;
      line-height: 1.6;

      &:focus {
        outline: none;
        border-color: ${({ theme }) => (theme as Theme).color.primary};
      }
    }

    select {
      height: 40px;
      padding: 0 12px;
      border: 1px solid ${({ theme }) => (theme as Theme).color.border};
      border-radius: ${({ theme }) => (theme as Theme).borderRadius.default};
      background: ${({ theme }) => (theme as Theme).color.surface};
      font-size: 0.875rem;
      color: #e9a23b;
    }

    .submit {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 8px;
    }
  }
`;
