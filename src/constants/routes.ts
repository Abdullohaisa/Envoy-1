export const AppRoutes = {
  auth: {
    welcome: "(auth)/",
    auth: "(auth)/auth", // registratsiya va login
    registerSmsCode: "(auth)/register-sms-code",
    registerUserInfo: "(auth)/register-user-info",
    registerUserPassword: "(auth)/register-user-password",
    resetPassword: {
      phone: "(auth)/reset-password/phone",
      smsCode: "(auth)/reset-password/sms-code",
      newPassword: "(auth)/reset-password/new-password",
    },
  },
  customer: {
    home: "/(app)/customer/",
  },
  driver: {
    home: "/(app)/driver/",
  },
};
