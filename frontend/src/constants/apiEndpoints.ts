
export const API_ENDPOINTS={
    USER_AUTH:{
        REGISTER:"/auth/user/register",
        LOGIN:"/auth/user/login",
        VERIFY_OTP:"/auth/user/verify-otp",
        LOGOUT:"/auth/user/logout",
        REFRESH:"/auth/user/refresh-token",
        ME:"/auth/user/me"
    },
     TRAINER_AUTH: {

    REGISTER:
      "/auth/trainer/register",

    LOGIN:
      "/auth/trainer/login",

    VERIFY_OTP:
      "/auth/trainer/verify-otp",

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