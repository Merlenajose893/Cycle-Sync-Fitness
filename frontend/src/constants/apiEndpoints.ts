
export const API_ENDPOINTS={
    USER_AUTH:{
        REGISTER:"/api/users/register",
        LOGIN:"/users/login",
        VERIFY_OTP:"/api/users/verify-otp",
        RESEND_OTP:"/api/users/resend-otp",
        LOGOUT:"/users/logout",
        REFRESH:"/users/refresh-token",
        ME:"/users/me"
    },
     TRAINER_AUTH: {

    REGISTER:
      "/api/trainer/register",

    LOGIN:
      "/api/trainer/login",

    VERIFY_OTP:
      "/api/trainer/verify-otp",

      RESEND_OTP:
      "/api/trainer/resend-otp",

    LOGOUT:
      "/auth/trainer/logout",

    REFRESH:
      "/auth/trainer/refresh",

    ME:
      "/auth/trainer/me",
  },

  ADMIN: {

  LOGIN:
    "/auth/admin/login",

  USERS:
    "/admin/users",

  TRAINERS:
    "/admin/trainers",
},



    
}