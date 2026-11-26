import styled from 'styled-components';
import Title from '../components/common/Title';
import CartItem from '../components/cart/CartItem';
import { useCart } from '../hooks/useCart';
import { useMemo, useState } from 'react';
import Empty from '../components/common/Empty';
import { FaShoppingCart } from 'react-icons/fa';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import { useAlert } from '../hooks/useAlert';
import { OrderSheet } from '../models/order.model';
import { Link, useNavigate } from 'react-router-dom';
import { Theme } from '../style/theme';
import CheckIconButton from '../components/cart/CheckIconButton';

export default function Cart() {
  const { showAlert, showConfirm } = useAlert();
  const navigate = useNavigate();
  const { carts, isEmpty, deleteCartItem } = useCart();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const handleCheck = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };
  const isAllChecked = carts.length > 0 && checkedItems.length === carts.length;
  const handleCheckAll = () => {
    setCheckedItems(isAllChecked ? [] : carts.map((cart) => cart.id));
  };
  const handleItemDelete = (id: number) => {
    deleteCartItem(id);
    setCheckedItems((prev) => prev.filter((item) => item !== id));
  };
  const totalQuantity = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.id)) {
        return acc + cart.quantity;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);
  const totalPrice = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.id)) {
        return acc + cart.price * cart.quantity;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);
  const handleOrder = () => {
    if (checkedItems.length === 0) {
      showAlert('주문할 상품을 선택해주세요.');
      return;
    }

    const firstChecked = carts.find((cart) => checkedItems.includes(cart.id));

    const orderData: Omit<OrderSheet, 'delivery'> = {
      items: checkedItems,
      totalPrice,
      totalQuantity,
      firstBookTitle: firstChecked ? firstChecked.title : carts[0].title,
    };

    showConfirm('주문하시겠습니까?', () => {
      navigate('/order', { state: orderData });
    });
  };

  return (
    <>
      <div className='page-title'>
        <Title size='large'>장바구니</Title>
      </div>
      <StyledCart>
        {!isEmpty && (
          <>
            <div className='content'>
              <div className='toolbar'>
                <div className='check-all'>
                  <CheckIconButton
                    isChecked={isAllChecked}
                    onCheck={handleCheckAll}
                    label='전체 선택'
                  />
                  <span onClick={handleCheckAll}>
                    전체 선택 ({checkedItems.length}/{carts.length})
                  </span>
                </div>
              </div>
              {carts.map((cart) => (
                <CartItem
                  key={cart.id}
                  cart={cart}
                  checkedItems={checkedItems}
                  onCheck={handleCheck}
                  onDelete={handleItemDelete}
                />
              ))}
            </div>
            <div className='summary'>
              <div className='summary-card'>
                <CartSummary
                  totalPrice={totalPrice}
                  totalQuantity={totalQuantity}
                />
                <Button
                  size='large'
                  scheme='primary'
                  onClick={handleOrder}
                  disabled={checkedItems.length === 0}
                >
                  {checkedItems.length > 0
                    ? `${checkedItems.length}개 상품 주문하기`
                    : '상품을 선택해주세요'}
                </Button>
              </div>
            </div>
          </>
        )}
        {isEmpty && (
          <Empty
            icon={<FaShoppingCart />}
            title='장바구니가 비었어요'
            description={
              <>
                마음에 드는 책을 담아보세요.
                <br />
                <Link to='/books'>도서 둘러보기</Link>
              </>
            }
          />
        )}
      </StyledCart>
    </>
  );
}

export const StyledCart = styled.div<{ theme: Theme }>`
  display: flex;
  gap: 32px;
  justify-content: space-between;
  align-items: flex-start;
  padding: 28px 0 0 0;

  > div:only-child {
    flex: 1;
  }

  .content {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4px 8px;

    .check-all {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-size: 0.9rem;
      font-weight: 600;
      cursor: pointer;
      user-select: none;
    }
  }

  .summary {
    position: sticky;
    top: 100px;
    width: 340px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .summary-card {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 28px;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.large};
    background: ${({ theme }) => theme.color.surface};
    box-shadow: ${({ theme }) => theme.shadow.medium};

    > button {
      width: 100%;
    }
  }

  .order-info {
    padding: 28px;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.large};
    background: ${({ theme }) => theme.color.surface};

    h1 {
      padding: 0 0 20px 0;
    }

    strong {
      font-weight: 600;
    }
  }

  .delivery {
    fieldset {
      border: 0;
      margin: 0;
      padding: 0 0 14px 0;
      display: flex;
      align-items: center;
      justify-content: start;
      gap: 10px;

      label {
        width: 80px;
        flex-shrink: 0;
        font-size: 0.875rem;
        font-weight: 600;
        color: ${({ theme }) => theme.color.muted};
      }

      .input {
        flex: 1;
        input {
          width: 100%;
        }
      }

      > button {
        height: 44px;
      }
    }

    .error-text {
      font-size: 0.8125rem;
      color: ${({ theme }) => theme.color.danger};
      margin: -6px 0 0;
      padding: 0 0 12px 90px;
    }
  }

  @media ${({ theme }) => `screen and ${theme.mediaQuery.tablet}`} {
    flex-direction: column;
    align-items: stretch;

    .summary {
      position: static;
      width: 100%;
    }
  }

  @media ${({ theme }) => `screen and ${theme.mediaQuery.mobile}`} {
    .order-info,
    .summary-card {
      padding: 20px;
    }

    .delivery {
      fieldset {
        flex-wrap: wrap;

        label {
          width: 100%;
        }
      }

      .error-text {
        padding-left: 0;
      }
    }
  }
`;
