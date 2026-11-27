import styled from 'styled-components';
import Title from '../components/common/Title';
import { useOrders } from '../hooks/useOrders';
import { Theme } from '../style/theme';
import { formatDate, formatNumber } from '../utils/format';
import Empty from '../components/common/Empty';
import Loading from '../components/common/Loading';
import BookCover from '../components/common/BookCover';
import {
  FaAngleDown,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaReceipt,
  FaUser,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function OrderList() {
  const { orders, isLoading, isOpen, loadingId, toggleOrderItem } =
    useOrders();

  return (
    <StyledOrderList>
      <div className='page-head'>
        <span className='eyebrow'>My Orders</span>
        <Title size='large'>주문 내역</Title>
        {orders.length > 0 && (
          <p className='count'>
            총 <strong>{orders.length}</strong>건의 주문
          </p>
        )}
      </div>

      {isLoading ? (
        <Loading />
      ) : orders.length === 0 ? (
        <Empty
          icon={<FaReceipt />}
          title='아직 주문 내역이 없어요'
          description={<Link to='/books'>도서 둘러보기</Link>}
        />
      ) : (
        <ul className='orders'>
          {orders.map((order) => {
            const open = isOpen(order.id);
            const detailId = `order-detail-${order.id}`;
            return (
              <li key={order.id} className={open ? 'order open' : 'order'}>
                <div className='order-head'>
                  <div className='meta'>
                    <span className='date'>
                      {formatDate(order.createdAt, 'YYYY.MM.DD')}
                    </span>
                    <span className='id'>주문번호 {order.id}</span>
                  </div>
                  <span className='badge'>주문 완료</span>
                </div>

                <div className='order-body'>
                  <div className='summary'>
                    <p className='title'>
                      {order.bookTitle}
                      {order.totalQuantity > 1 && (
                        <span className='more'>
                          {' '}
                          외 {order.totalQuantity - 1}권
                        </span>
                      )}
                    </p>
                    <ul className='delivery'>
                      <li>
                        <FaMapMarkerAlt />
                        {order.address}
                      </li>
                      <li>
                        <FaUser />
                        {order.receiver}
                      </li>
                      <li>
                        <FaPhoneAlt />
                        {order.contact}
                      </li>
                    </ul>
                  </div>
                  <div className='price'>
                    <span className='label'>결제 금액</span>
                    <strong>{formatNumber(order.totalPrice)}원</strong>
                    <span className='qty'>총 {order.totalQuantity}권</span>
                  </div>
                </div>

                <button
                  type='button'
                  className='detail-toggle'
                  aria-expanded={open}
                  aria-controls={detailId}
                  onClick={() => toggleOrderItem(order.id)}
                  disabled={loadingId === order.id}
                >
                  {loadingId === order.id
                    ? '불러오는 중…'
                    : open
                    ? '상세 닫기'
                    : '주문 상세 보기'}
                  <FaAngleDown />
                </button>

                <div className='detail' id={detailId} aria-hidden={!open}>
                  <div className='detail-inner'>
                    <ul>
                      {order.detail?.map((item) => (
                        <li key={item.bookId}>
                          <Link
                            to={`/books/${item.bookId}`}
                            className='thumb'
                            tabIndex={open ? 0 : -1}
                          >
                            <BookCover
                              img={item.img ?? item.bookId}
                              title={item.title}
                              size='small'
                            />
                          </Link>
                          <div className='info'>
                            <Link
                              to={`/books/${item.bookId}`}
                              className='name'
                              tabIndex={open ? 0 : -1}
                            >
                              {item.title}
                            </Link>
                            <span className='author'>{item.author}</span>
                          </div>
                          <div className='line'>
                            <span className='unit'>
                              {formatNumber(item.price)}원 × {item.quantity}
                            </span>
                            <strong>
                              {formatNumber(item.price * item.quantity)}원
                            </strong>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </StyledOrderList>
  );
}

const StyledOrderList = styled.div<{ theme: Theme }>`
  max-width: ${({ theme }) => theme.layout.width.medium};
  margin: 0 auto;

  .page-head {
    margin-bottom: 28px;

    .eyebrow {
      display: block;
      margin-bottom: 6px;
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.color.accent};
    }

    .count {
      margin-top: 6px;
      font-size: 0.9rem;
      color: ${({ theme }) => theme.color.muted};

      strong {
        color: ${({ theme }) => theme.color.text};
      }
    }
  }

  .orders {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .order {
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.large};
    background: ${({ theme }) => theme.color.surface};
    transition: box-shadow 0.2s ease, border-color 0.2s ease;

    &.open {
      border-color: ${({ theme }) => theme.color.primary};
      box-shadow: ${({ theme }) => theme.shadow.medium};
    }
  }

  .order-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 16px 24px;
    border-bottom: 1px solid ${({ theme }) => theme.color.border};
    background: ${({ theme }) => theme.color.surfaceAlt};

    .meta {
      display: flex;
      align-items: baseline;
      gap: 12px;
    }

    .date {
      font-weight: 700;
    }

    .id {
      font-size: 0.8125rem;
      color: ${({ theme }) => theme.color.secondary};
    }

    .badge {
      flex-shrink: 0;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 0.75rem;
      font-weight: 700;
      color: ${({ theme }) => theme.color.third};
      background: ${({ theme }) =>
        theme.name === 'light'
          ? 'rgba(46, 125, 91, 0.1)'
          : 'rgba(127, 200, 162, 0.14)'};
    }
  }

  .order-body {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    padding: 22px 24px;

    .summary {
      min-width: 0;
    }

    .title {
      font-size: 1.0625rem;
      font-weight: 700;
      word-break: keep-all;

      .more {
        font-weight: 500;
        color: ${({ theme }) => theme.color.muted};
      }
    }

    .delivery {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin: 12px 0 0;
      padding: 0;
      list-style: none;

      li {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.8125rem;
        color: ${({ theme }) => theme.color.muted};
      }

      svg {
        flex-shrink: 0;
        width: 11px;
        height: 11px;
        fill: ${({ theme }) => theme.color.secondary};
      }
    }

    .price {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      gap: 2px;

      .label,
      .qty {
        font-size: 0.75rem;
        color: ${({ theme }) => theme.color.secondary};
      }

      strong {
        font-size: 1.375rem;
        font-weight: 800;
        letter-spacing: -0.02em;
      }
    }
  }

  .detail-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    padding: 14px;
    border: 0;
    border-top: 1px solid ${({ theme }) => theme.color.border};
    background: none;
    font-size: 0.875rem;
    font-weight: 600;
    color: ${({ theme }) => theme.color.muted};
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease;

    svg {
      width: 12px;
      height: 12px;
      fill: currentColor;
      transition: transform 0.25s ease;
    }

    &:hover {
      color: ${({ theme }) => theme.color.text};
      background: ${({ theme }) => theme.color.hover};
    }

    &[aria-expanded='true'] svg {
      transform: rotate(180deg);
    }

    &:disabled {
      cursor: progress;
    }
  }

  /* 높이를 모르는 내용을 부드럽게 펼치기 위한 grid 트릭 */
  .detail {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s ease;

    > .detail-inner {
      overflow: hidden;
    }
  }

  .order.open .detail {
    grid-template-rows: 1fr;
  }

  .detail ul {
    margin: 0;
    padding: 4px 24px 20px;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 14px 0;

      & + li {
        border-top: 1px dashed ${({ theme }) => theme.color.border};
      }
    }

    .thumb {
      flex-shrink: 0;
      width: 44px;
    }

    .info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;

      .name {
        font-size: 0.9375rem;
        font-weight: 600;
        text-decoration: none;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:hover {
          text-decoration: underline;
          text-underline-offset: 3px;
        }
      }

      .author {
        font-size: 0.8125rem;
        color: ${({ theme }) => theme.color.secondary};
      }
    }

    .line {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .unit {
        font-size: 0.75rem;
        color: ${({ theme }) => theme.color.secondary};
      }

      strong {
        font-size: 0.9375rem;
      }
    }
  }

  @media ${({ theme }) => `screen and ${theme.mediaQuery.mobile}`} {
    .page-head h1 {
      font-size: 1.6rem;
    }

    .order-head {
      padding: 14px 16px;

      .meta {
        flex-direction: column;
        gap: 0;
      }
    }

    .order-body {
      flex-direction: column;
      gap: 16px;
      padding: 18px 16px;

      .price {
        flex-direction: row;
        align-items: baseline;
        justify-content: space-between;
        padding-top: 14px;
        border-top: 1px dashed ${({ theme }) => theme.color.border};

        .qty {
          display: none;
        }

        strong {
          font-size: 1.2rem;
        }
      }
    }

    .detail ul {
      padding: 0 16px 16px;

      li {
        gap: 12px;
      }

      .thumb {
        width: 38px;
      }
    }
  }
`;
