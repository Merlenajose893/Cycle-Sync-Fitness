
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
      "/api/trainer/logout",

    REFRESH:
      "/api/trainer/refresh",

    ME:
      "/api/trainer/me",
  },

  ADMIN: {

  LOGIN:
    "/api/admin/login",

  USERS:
    "/api/users",

  TRAINERS:
    "/api/trainers",
},


USER_ONBOARDING:{
  STATUS:"/api/onboarding/user/status",
  BODY_DETAILS:"/api/onboarding/user/body-details",
  CYCLE_SETUP:"/api/onboarding/user/cycle-setup",
  GOALS:"/api/onboarding/user/goals",
  COMPLETE:"/api/onboarding/user/complete",
},

TRAINER_ONBOARDING:{
  STATUS:"/api/onboarding/trainer/status",
  PROFILE:"/api/onboarding/trainer/profile",
  CERTIFICATIONS:"/api/onboarding/trainer/certifications",
  PACKAGES:"/api/onboarding/trainer/packages",
  COMPLETE:"/api/onboarding/trainer/complete"

}



    
}