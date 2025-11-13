import { useState, useEffect, useCallback } from "react";

import api from "@/axios/axios.config";
import { AxiosError } from "axios";

export const fetchSingleOrder = async (url: string, method: string) => {
  if (method === "post") {
    const { data } = await api.post(url);
    console.log(data);
    return data || data;
  } else {
    const { data } = await api.get(url);
    console.log(data);
    return data || data;
  }
};

export const useFetchSingleOrder = (url: string, method: string) => {
  const [order, setOrder] = useState<any>(null);
  const [requestedDrivers, setRequestedDrivers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadOrder = useCallback(async () => {
    if (!url) return;
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchSingleOrder(url, method);
      console.log(data);

      setOrder(data);
      setRequestedDrivers(data.requestedDrivers || []);
    } catch (err: any) {
      console.log(error);
      if (err instanceof AxiosError)
        setError(err.response?.data || "Tarmoq xatosi");
    } finally {
      setIsLoading(false);
    }
  }, [url]);

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
