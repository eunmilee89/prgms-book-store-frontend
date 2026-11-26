import styled from 'styled-components';
import { Cart } from '../../models/cart.model';
import { formatNumber } from '../../utils/format';
import { Theme } from '../../style/theme';
import CheckIconButton from './CheckIconButton';
import { useMemo } from 'react';
import { useAlert } from '../../hooks/useAlert';
import { Link } from 'react-router-dom';
import BookCover from '../common/BookCover';
import { FaTrashAlt } from 'react-icons/fa';

interface Props {
  cart: Cart;
  checkedItems: number[];
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function CartItem({
  cart,
  checkedItems,
  onCheck,
  onDelete,
}: Props) {
  const { showConfirm } = useAlert();

  const isChecked = useMemo(() => {
    return checkedItems.includes(cart.id);
  }, [checkedItems, cart.id]);

  const handleCheck = () => {
    onCheck(cart.id);
  };

  const handleDelete = () => {
    showConfirm('정말 삭제하시겠습니까?', () => {
      onDelete(cart.id);
    });
  };

  return (
    <StyledCartItem $checked={isChecked}>
      <div className='check'>
        <CheckIconButton
          isChecked={isChecked}
          onCheck={handleCheck}
          label={`${cart.title} 선택`}
        />
      </div>
      <Link to={`/books/${cart.bookId}`} className='thumb'>
        <BookCover
          img={cart.img ?? cart.bookId}
          title={cart.title}
          size='small'
        />
      </Link>
      <div className='info'>
        <Link to={`/books/${cart.bookId}`} className='title'>
          {cart.title}
        </Link>
        <p className='summary'>{cart.summary}</p>
        <p className='unit'>
          {formatNumber(cart.price)}원 · {cart.quantity}권
        </p>
      </div>
      <div className='right'>
        <p className='total'>{formatNumber(cart.price * cart.quantity)}원</p>
        <button
          type='button'
          className='delete'
          onClick={handleDelete}
          aria-label='장바구니에서 삭제'
        >
          <FaTrashAlt />
        </button>
      </div>
    </StyledCartItem>
  );
}

const StyledCartItem = styled.div<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border: 1px solid
    ${({ theme, $checked }) =>
      $checked ? (theme as Theme).color.primary : (theme as Theme).color.border};
  border-radius: ${({ theme }) => (theme as Theme).borderRadius.large};
  background: ${({ theme }) => (theme as Theme).color.surface};
  transition: border-color 0.15s ease;

  .check {
    flex-shrink: 0;
  }

  .thumb {
    flex-shrink: 0;
    width: 72px;
  }

  .info {
    flex: 1;
    min-width: 0;

    .title {
      display: block;
      font-size: 1.0625rem;
      font-weight: 700;
      text-decoration: none;
      color: ${({ theme }) => (theme as Theme).color.text};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &:hover {
        text-decoration: underline;
        text-underline-offset: 3px;
      }
    }

    .summary {
      margin-top: 4px;
      font-size: 0.875rem;
      color: ${({ theme }) => (theme as Theme).color.muted};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .unit {
      margin-top: 10px;
      font-size: 0.8125rem;
      color: ${({ theme }) => (theme as Theme).color.secondary};
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    align-self: stretch;
    gap: 12px;

    .total {
      font-size: 1.0625rem;
      font-weight: 800;
      white-space: nowrap;
    }

    .delete {
      width: 34px;
      height: 34px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      border-radius: 50%;
      background: none;
      cursor: pointer;
      transition: background-color 0.15s ease;

      svg {
        width: 14px;
        height: 14px;
        fill: ${({ theme }) => (theme as Theme).color.secondary};
      }

      &:hover {
        background: ${({ theme }) => (theme as Theme).color.hover};

        svg {
          fill: ${({ theme }) => (theme as Theme).color.danger};
        }
      }
    }
  }

  @media ${({ theme }) => `screen and ${(theme as Theme).mediaQuery.mobile}`} {
    gap: 12px;
    padding: 14px;

    .thumb {
      width: 56px;
    }

    .info .title {
      font-size: 0.95rem;
    }
  }
`;
