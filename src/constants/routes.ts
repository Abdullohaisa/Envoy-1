export const AppRoutes = {
  auth: {
    welcome: "(auth)/",
    auth: "(auth)/auth", // registratsiya va login
    resetPassword: {
      phone: "(auth)/reset-password/phone",
      smsCode: "(auth)/reset-password/sms-code",
      reset: "(auth)/reset-password/reset",
    },
  },
  customer: {
    home: "/(app)/customer/",
  },
  driver: {
    home: "/(app)/driver/",
  },
};
