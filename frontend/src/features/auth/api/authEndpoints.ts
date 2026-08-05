/**
 * Auth-feature API endpoint constants.
 * Extracted from the monolithic constants/apiEndpoints.ts
 */
export const AUTH_ENDPOINTS = {
  USER_AUTH: {
    REGISTER: "/api/users/register",
    GOOGLE_SIGNIN: "/api/users/google-signin",
    LOGIN: "/api/users/login",
    VERIFY_OTP: "/api/users/verify-otp",
    RESEND_OTP: "/api/users/resend-otp",
    LOGOUT: "/api/users/logout",
    REFRESH: "/api/users/refresh-token",
    FORGOT_PASSWORD: "/api/users/forgot-password",
    RESET_PASSWORD: "/api/users/reset-password",
    ME: "/api/users/me",
  },

  TRAINER_AUTH: {
    REGISTER: "/api/trainer/register",
    LOGIN: "/api/trainer/login",
    VERIFY_OTP: "/api/trainer/verify-otp",
    RESEND_OTP: "/api/trainer/resend-otp",
    LOGOUT: "/api/trainer/logout",
    REFRESH: "/api/trainer/refresh",
    ME: "/api/trainer/me",
    FORGOT_PASSWORD: "/api/trainer/forgot-password",
    RESET_PASSWORD: "/api/trainer/reset-password",
  },

  ADMIN: {
    LOGIN: "/api/admin/admin-login",
    USERS: "/api/admin/users",
    TRAINERS: "/api/admin/trainers",
    BLOCK_USER: "/api/admin/users",
    UNBLOCK_USER: "/api/admin/users",
    BLOCK_TRAINER: "/api/admin/trainers",
    UNBLOCK_TRAINER: "/api/admin/trainers",
    PENDING_TRAINERS: "/api/admin/trainers/pending",
    APPROVE_TRAINER: "/api/admin/trainers",
    REJECT_TRAINER: "/api/admin/trainers",
  },
} as const;
