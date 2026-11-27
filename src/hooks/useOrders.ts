import { useEffect, useState } from 'react';
import { OrderListItem } from '../models/order.model';
import { fetchOrders, fetchOrder } from '../api/order.api';

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [openIds, setOpenIds] = useState<number[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders()
      .then((orders) => {
        setOrders(orders);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const isOpen = (orderId: number) => openIds.includes(orderId);

  // 주문 상세 열기/닫기 (여러 개를 동시에 열 수 있음)
  const toggleOrderItem = (orderId: number) => {
    if (isOpen(orderId)) {
      setOpenIds((prev) => prev.filter((id) => id !== orderId));
      return;
    }

    const target = orders.find((item) => item.id === orderId);
    if (target?.detail) {
      setOpenIds((prev) => [...prev, orderId]);
      return;
    }

    setLoadingId(orderId);
    fetchOrder(orderId)
      .then((orderDetail) => {
        setOrders((prev) =>
          prev.map((item) =>
            item.id === orderId ? { ...item, detail: orderDetail } : item
          )
        );
        setOpenIds((prev) => [...prev, orderId]);
      })
      .finally(() => setLoadingId(null));
  };

  return { orders, isLoading, isOpen, loadingId, toggleOrderItem };
};
