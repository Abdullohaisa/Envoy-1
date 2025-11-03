import { atom } from "jotai";
import { sendSms } from "./api";
import { SmsState } from "./types";

// Boshlang‘ich holat
const smsStateAtom = atom<SmsState>({
  sms: null,
  isLoading: false,
  error: null,
});

// Asosiy atom
export const smsAtom = atom(
  (get) => get(smsStateAtom), // read: faqat holatni o'qish
  async (_get, set, phone: string) => {
    // Loadingni true qilish
    set(smsStateAtom, { sms: null, isLoading: true, error: null });

    try {
      const { code } = await sendSms(phone);
      set(smsStateAtom, {
        sms: code,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || "SMS yuborishda xatolik yuz berdi";

      set(smsStateAtom, {
        sms: null,
        isLoading: false,
        error: errorMessage,
      });
    }
  }
);
