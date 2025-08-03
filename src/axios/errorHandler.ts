import { appStore, errorAtom } from "@/shared/Error/errorAtom";



export const handleApiError = (error: any) => {
  if (error.response) {
    const { status, data } = error.response;

    if (status >= 400 && status < 500) {
      appStore.set(
        errorAtom,
        data?.message || "Noto‘g‘ri so‘rov bajarildi. Ma’lumotlarni tekshiring."
      );
    } else if (status >= 500) {
      appStore.set(
        errorAtom,
        "Serverda muammo yuz berdi. Iltimos, keyinroq urinib ko‘ring."
      );
    }
  } else if (error.request ) {
    appStore.set(
      errorAtom,
      "Internetga ulanishda muammo. Iltimos, aloqani tekshiring."
    );
  } else {
    appStore.set(errorAtom, "Noma’lum xatolik yuz berdi.");
  }


};
