// useCheckRegister.ts
import { useCallback, useRef, useState } from "react";
import api from "@/axios/axios.config";

type CheckRegisterState = {
  status: boolean | null;
  isLoading: boolean;
  error: string | null;
};

type UseCheckRegisterReturn = {
  checkPhone: (
    phone: string,
    opts?: { debounceMs?: number }
  ) => Promise<boolean | null>;
  cancel: () => void;
  state: CheckRegisterState;
};

export const useCheckRegister = (): UseCheckRegisterReturn => {
  const [state, setState] = useState<CheckRegisterState>({
    status: null,
    isLoading: false,
    error: null,
  });

  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const cancel = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setState((s) => ({ ...s, isLoading: false }));
  }, []);

  const checkPhone = useCallback(
    (phone: string, opts: { debounceMs?: number } = {}) =>
      new Promise<boolean | null>(async (resolve) => {
        const wait = opts.debounceMs ?? 0;

        // cancel previous
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (abortRef.current) {
          abortRef.current.abort();
          abortRef.current = null;
        }

        debounceRef.current = setTimeout(async () => {
          debounceRef.current = null;
          setState({ status: null, isLoading: true, error: null });

          const controller = new AbortController();
          abortRef.current = controller;

          try {
            // axios post: body as second param, options as third
            const resp = await api.post(
              "/users/check-phone/",
              { phone },
              { signal: controller.signal }
            );

            const exists = Boolean(resp.data?.exists);
            setState({ status: exists, isLoading: false, error: null });
            abortRef.current = null;
            resolve(exists);
          } catch (err: any) {
            // ignore aborts
            if (err?.name === "AbortError") {
              // request cancelled
              resolve(null);
              return;
            }

            const message =
              err?.response?.data?.message || err?.message || "Unknown error";
            setState({ status: null, isLoading: false, error: message });
            abortRef.current = null;
            resolve(null);
          }
        }, wait);
      }),
    []
  );

  return { checkPhone, cancel, state };
};

export default useCheckRegister;
