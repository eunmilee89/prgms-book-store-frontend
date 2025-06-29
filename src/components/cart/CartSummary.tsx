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
        <dt>총 금액</dt>
        <dd>{formatNumber(totalPrice)} 원</dd>
      </dl>
    </StyledCartSummary>
  );
}

const StyledCartSummary = styled.div<{ theme: Theme }>`
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: 12px;
  width: 240px;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 12px;
  }
  dl {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    dd {
      font-weight: 700;
    }
  }
`;
