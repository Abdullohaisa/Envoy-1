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
      truck: "/(app)/customer/get-order/truck",
      price: "/(app)/customer/get-order/price",
      comment: "/(app)/customer/get-order/comment",
      time: "/(app)/customer/get-order/time",
      locations: {
        index: "/(app)/customer/get-order/locations/",
        map: "/(app)/customer/get-order/locations/map",
      },
    },
    profile: {
      index: "/(app)/customer/profile/",
      results: {
        index: "/(app)/customer/profile/results",
      },
      settings: {
        index: "/(app)/customer/profile/settings",
        language: "/(app)/customer/profile/settings/language",
        notification: "/(app)/customer/profile/settings/notification",
      },
      user: {
        index: "/(app)/customer/profile/user/",
        comments: "/(app)/customer/profile/user/comments",
      },
    },
    orders: "/(app)/customer/orders",
  },
  driver: {
    orders: {
      index: "/(app)/driver/orders/",
      search: "/(app)/driver/orders/search-order",
      map: "/(app)/driver/orders/map",
    },
    profile: {
      index: "/(app)/driver/profile/",
      results: {
        index: "/(app)/driver/profile/results",
      },
      settings: {
        index: "/(app)/driver/profile/settings",
        language: "/(app)/driver/profile/settings/language",
        notification: "/(app)/driver/profile/settings/notification",
      },
      user: {
        index: "/(app)/driver/profile/user/",
        comments: "/(app)/driver/profile/user/comments",
      },
    },
  },
};
