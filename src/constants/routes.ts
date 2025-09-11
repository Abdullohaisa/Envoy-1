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
    getOrder: {
      index: "/(app)/customer/get-order",
      cargo: "/(app)/customer/get-order/cargo",
      locations: "/(app)/customer/get-order/locations",
      truck: "/(app)/customer/get-order/truck",
      price: "/(app)/customer/get-order/price",
      comment: "/(app)/customer/get-order/comment",
      time: "/(app)/customer/get-order/time",
    },
    home: "/(app)/customer/",
    orders: "/(app)/customer/orders",
  },
  driver: {
    home: "/(app)/driver/",
  },
};
