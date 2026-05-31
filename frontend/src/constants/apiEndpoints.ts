
export const API_ENDPOINTS={
    USER_AUTH:{
        REGISTER:"/api/users/register",
        LOGIN:"/users/login",
        VERIFY_OTP:"/users/verify-otp",
        LOGOUT:"/users/logout",
        REFRESH:"/users/refresh-token",
        ME:"/users/me"
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