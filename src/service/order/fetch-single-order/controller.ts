import { useState, useEffect, useCallback } from "react";

import api from "@/axios/axios.config";
import { AxiosError } from "axios";

export const fetchSingleOrder = async (orderId: string) => {
  const { data } = await api.get(`/order/customer-order/${orderId}/`);
  return data.order || data;
};

export const useFetchSingleOrder = (orderId?: string) => {
  const [order, setOrder] = useState<any>(null);
  const [requestedDrivers, setRequestedDrivers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadOrder = useCallback(async () => {
    if (!orderId) return;
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchSingleOrder(orderId);
      setOrder(data);
      setRequestedDrivers(data.requestedDrivers || []);
    } catch (err: any) {
      if (err instanceof AxiosError)
        setError(err.response?.data || "Tarmoq xatosi");
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  return {
    order,
    requestedDrivers,
    isLoading,
    error,
    refetch: loadOrder,
  };
};
