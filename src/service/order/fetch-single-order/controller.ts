import { useState, useEffect, useCallback } from "react";

import api from "@/axios/axios.config";
import { AxiosError } from "axios";
import { IOrder } from "@/types/order";

export const fetchSingleOrder = async (id: string) => {
  const { data } = await api.get(`/order/${id}/`);
  return data || data;
};

export const useFetchSingleOrder = (id: string) => {
  const [order, setOrder] = useState<IOrder>({} as IOrder);
  const [requestedDrivers, setRequestedDrivers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadOrder = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchSingleOrder(id);

      setOrder(data);
      setRequestedDrivers(data.requestedDrivers || []);
    } catch (err: any) {
      if (err instanceof AxiosError)
        setError(err.response?.data || "Tarmoq xatosi");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

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
