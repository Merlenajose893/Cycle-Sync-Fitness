
export const API_ENDPOINTS={
<<<<<<< HEAD
    USER_AUTH: {
    REGISTER: "/api/users/register",
    LOGIN: "/api/users/login",
    VERIFY_OTP: "/api/users/verify-otp",
    RESEND_OTP: "/api/users/resend-otp",
    LOGOUT: "/api/users/logout",
    REFRESH: "/api/users/refresh-token",
    FORGOTPASSWORD: "/api/users/forgot-password",
    RESETPASSWORD:"/api/users/reset-password",
    ME: "/api/users/me"
},
=======
    USER_AUTH:{
        REGISTER:"/api/users/register",
        LOGIN:"/users/login",
        VERIFY_OTP:"/api/users/verify-otp",
        RESEND_OTP:"/api/users/resend-otp",
        LOGOUT:"/users/logout",
        REFRESH:"/users/refresh-token",
        ME:"/users/me"
    },
>>>>>>> 081b12d (changes)
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
<<<<<<< HEAD
      "/api/trainer/logout",

    REFRESH:
      "/api/trainer/refresh",

    ME:
      "/api/trainer/me",
=======
      "/auth/trainer/logout",

    REFRESH:
      "/auth/trainer/refresh",

    ME:
      "/auth/trainer/me",
>>>>>>> 081b12d (changes)
  },

  ADMIN: {

  LOGIN:
<<<<<<< HEAD
    "/api/admin/admin-login",

  USERS:
    "/api/admin/users",

  TRAINERS:
    "/api/admin/trainers",
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


=======
    "/auth/admin/login",

  USERS:
    "/admin/users",

  TRAINERS:
    "/admin/trainers",
},


>>>>>>> 081b12d (changes)

    
}