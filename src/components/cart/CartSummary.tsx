import styled from 'styled-components';
import { formatNumber } from '../../utils/format';
import { Theme } from '../../style/theme';

interface Props {
  totalQuantity: number;
  totalPrice: number;
}

export default function CartSummary({ totalQuantity, totalPrice }: Props) {
  return (
    <StyledCartSummary>
      <h1>주문 요약</h1>
      <dl>
        <dt>총 수량</dt>
        <dd>{totalQuantity} 권</dd>
      </dl>
      <dl>
        <dt>배송비</dt>
        <dd className='free'>무료</dd>
      </dl>
      <dl className='total'>
        <dt>총 금액</dt>
        <dd>{formatNumber(totalPrice)} 원</dd>
      </dl>
    </StyledCartSummary>
  );
}

const StyledCartSummary = styled.div<{ theme: Theme }>`
  h1 {
    font-family: ${({ theme }) => theme.font.serif};
    font-size: 1.2rem;
    margin-bottom: 20px;
  }

  dl {
    display: flex;
    justify-content: space-between;
    margin: 0 0 12px;
    font-size: 0.9375rem;

    dt {
      color: ${({ theme }) => theme.color.muted};
    }

    dd {
      margin: 0;
      font-weight: 600;
    }

    .free {
      color: ${({ theme }) => theme.color.third};
    }
  }

  .total {
    margin: 20px 0 0;
    padding-top: 20px;
    border-top: 1px dashed ${({ theme }) => theme.color.border};
    align-items: baseline;

    dt {
      color: ${({ theme }) => theme.color.text};
      font-weight: 600;
    }

    dd {
      font-size: 1.5rem;
      font-weight: 800;
      letter-spacing: -0.02em;
    }
  }
`;
