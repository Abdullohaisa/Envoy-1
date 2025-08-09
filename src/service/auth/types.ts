export interface AuthResponseData {
  token: string | null;
  role: string | null;
  phone: string | null;
}

export interface AuthResponse {
  data: AuthResponseData;
}

export interface AuthRequestLogin {
  phone_email: string;
  password: string;
}

export interface AuthRequestRegister {
  username?: string;
  phone_email: string;
  password: string;
  role?: "Driver" | "Customer" | null; // Agar boshqa rollar bo‘lmasa
  user_image?: string | null; // Null bo'lishi yoki string (URL) bo'lishi mumkin
}
