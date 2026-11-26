import styled from 'styled-components';
import { BookDetail } from '../../models/book.model';
import Button from '../common/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Theme } from '../../style/theme';
import { useBook } from '../../hooks/useBook';
import { FaMinus, FaPlus, FaShoppingBag } from 'react-icons/fa';

interface Props {
  book: BookDetail;
}

export default function AddToCart({ book }: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart, cartAdded } = useBook(book.id.toString());
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setQuantity(Number.isNaN(value) || value < 1 ? 1 : value);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleDecrease = () => {
    if (quantity === 1) return;
    setQuantity(quantity - 1);
  };

  return (
    <StyledAddToCart $added={cartAdded}>
      <div className='stepper'>
        <button
          type='button'
          onClick={handleDecrease}
          disabled={quantity === 1}
          aria-label='수량 감소'
        >
          <FaMinus />
        </button>
        <input
          type='number'
          min={1}
          value={quantity}
          onChange={handleChange}
          aria-label='수량'
        />
        <button type='button' onClick={handleIncrease} aria-label='수량 증가'>
          <FaPlus />
        </button>
      </div>
      <Button
        size='medium'
        scheme='primary'
        className='add'
        onClick={() => addToCart(quantity)}
      >
        <FaShoppingBag />
        장바구니 담기
      </Button>
      <div className='added' role='status'>
        <p>장바구니에 담았어요.</p>
        <Link to='/cart'>장바구니로 이동 →</Link>
      </div>
    </StyledAddToCart>
  );
}

interface AddToCartStyleProps {
  $added: boolean;
}

const StyledAddToCart = styled.div<AddToCartStyleProps>`
  flex: 1;
  display: flex;
  align-items: stretch;
  gap: 10px;
  position: relative;

  .stepper {
    display: flex;
    align-items: center;
    height: 48px;
    border: 1px solid ${({ theme }) => (theme as Theme).color.border};
    border-radius: ${({ theme }) => (theme as Theme).borderRadius.default};
    background: ${({ theme }) => (theme as Theme).color.surface};

    button {
      width: 40px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      background: none;
      cursor: pointer;

      svg {
        width: 11px;
        height: 11px;
        fill: ${({ theme }) => (theme as Theme).color.text};
      }

      &:disabled {
        cursor: default;
        opacity: 0.3;
      }
    }

    input {
      width: 40px;
      border: 0;
      background: none;
      text-align: center;
      font-size: 1rem;
      font-weight: 700;
      -moz-appearance: textfield;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &:focus {
        outline: none;
      }
    }
  }

  .add {
    flex: 1;
    height: 48px;
  }

  .added {
    position: absolute;
    left: 0;
    right: 0;
    top: calc(100% + 10px);
    z-index: 5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: ${({ theme }) => (theme as Theme).color.text};
    border-radius: ${({ theme }) => (theme as Theme).borderRadius.default};
    box-shadow: ${({ theme }) => (theme as Theme).shadow.medium};
    opacity: ${({ $added }) => ($added ? '1' : '0')};
    transform: translateY(${({ $added }) => ($added ? '0' : '-4px')});
    pointer-events: ${({ $added }) => ($added ? 'auto' : 'none')};
    transition: all 0.3s ease;

    p,
    a {
      margin: 0;
      font-size: 0.875rem;
      color: ${({ theme }) => (theme as Theme).color.background};
    }

    a {
      font-weight: 700;
      text-decoration: none;
    }
  }

  @media ${({ theme }) => `screen and ${(theme as Theme).mediaQuery.mobile}`} {
    gap: 8px;
    min-width: 0;

    .stepper {
      flex-shrink: 0;

      button {
        width: 32px;
      }

      input {
        width: 30px;
      }
    }

    .add {
      min-width: 0;
      padding-left: 10px;
      padding-right: 10px;
    }

    /* 하단 바에서는 알림을 위쪽으로 띄움 */
    .added {
      top: auto;
      bottom: calc(100% + 20px);
      transform: translateY(${({ $added }) => ($added ? '0' : '4px')});
    }
  }
`;
