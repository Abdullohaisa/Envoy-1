// export interface AuthResponseData {
//   access: string | null;
//   role: string | null;
//   phone: string | null;
// }

// export interface AuthResponse {
//   data: AuthResponseData;
// }

// export interface AuthRequestLogin {
//   phone: string;
//   password: string;
// }

// export interface AuthRequestRegister {
//   username?: string;
//   phone: string;
//   password: string;
//   role?: "Driver" | "Customer" | null; // Agar boshqa rollar bo‘lmasa
//   user_image?: string | null; // Null bo'lishi yoki string (URL) bo'lishi mumkin
// }

export interface AuthResponseData {
  access: string | null;
  role: "Customer" | "Driver" | null;
  refresh: string | null;
}

export interface AuthResponse {
  data: AuthResponseData | null;
  isLoading: boolean;
  error: any | null;
}

export interface Register {
  phone: string;
  username: string;
  password: string;
}

export interface AuthPayload {
  username?: string;
  phone: string;
  password: string;
  role?: "Driver" | "Customer" | null; // Agar boshqa rollar bo‘lmasa
}
