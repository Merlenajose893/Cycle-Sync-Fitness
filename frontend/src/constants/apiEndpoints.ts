
export const API_ENDPOINTS={
    USER_AUTH: {
    REGISTER: "/api/users/register",
    GOOGLE_SIGIN:"/api/users/google-signin",
    LOGIN: "/api/users/login",
    VERIFY_OTP: "/api/users/verify-otp",
    RESEND_OTP: "/api/users/resend-otp",
    LOGOUT: "/api/users/logout",
    REFRESH: "/api/users/refresh-token",
    FORGOTPASSWORD: "/api/users/forgot-password",
    RESETPASSWORD:"/api/users/reset-password",
    ME: "/api/users/me"
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

    FORGOT_PASSWORD:"/api/trainer/forgot-password",

    RESET_PASSWORD:"/api/trainer/reset-password"

      

  },

  ADMIN: {

  LOGIN:

    "/api/admin/admin-login",

  USERS:
    "/api/admin/users",


  TRAINERS:
    "/api/admin/trainers",

    BLOCK_USER:"/api/admin/users",
    UNBLOCK_USER:"/api/admin/users",
    BLOCK_TRAINER:"/api/admin/trainers",
    UNBLOCK_TRAINER:"/api/admin/trainers",

    PENDING_TRAINERS:"/api/admin/trainers/pending",
    APPROVE_TRAINER:"/api/admin/trainers",
    REJECT_TRAINER:"/api/admin/trainers"
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
  COMPLETE:"/api/onboarding/trainer/complete",
  AVATAR:"/api/onboarding/trainer/avatar",
  DOCUMENTS:"/api/onboarding/trainer/documents"

},
USER_PROFILE: {
  PROFILE: "/api/users/profile",
  AVATAR: "/api/users/profile/avatar",
},

USER_ACCOUNT: {
  CHANGE_PASSWORD: "/api/users/account/change-password",
  DELETE_ACCOUNT: "/api/users/account",
},

AI_PLAN:{
  GENERATE:"/api/ai-plans/generate",
  DRAFT:"/api/ai-plans/draft",
  ACTIVE:"/api/ai-plans/active",
  HISTORY:"/api/ai-plans/history",
  STATUS:(id:string)=>`/api/ai-plans/${id}/status`,
  EDIT:(id:string)=>`/api/ai-plans/${id}`,
  DELETE:(id:string)=>`/api/ai-plans/${id}`
}






    
}