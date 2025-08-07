// /service/checkPhone/types.ts
export interface CheckPhoneResponse {
  exists: boolean;
  // agar backend qo'shimcha maydon qaytarsa, shu yerga qo'shing
}

export type CheckPhoneResult = boolean; // true = ro'yxatdan o'tgan
