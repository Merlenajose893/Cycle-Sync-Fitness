export const RECIPE_MESSAGES = {
    FETCH_FAILED: "Failed to fetch recipes",
    FETCH_UNEXPECTED: "Unexpected error occurred while fetching recipes",
    SEARCH_FAILED: "Failed to search recipes",
    SEARCH_UNEXPECTED: "Unexpected error occurred while searching recipes",
    FETCH_BY_ID_FAILED: "Failed to fetch recipe",
    FETCH_BY_ID_UNEXPECTED: "Unexpected error occurred while fetching recipe",
    CREATE_FAILED: "Failed to create recipe",
    CREATE_UNEXPECTED: "Unexpected error occurred while creating recipe",
    UPDATE_FAILED: "Failed to update recipe",
    UPDATE_UNEXPECTED: "Unexpected error occurred while updating recipe",
    DELETE_FAILED: "Failed to delete recipe",
    DELETE_UNEXPECTED: "Unexpected error occurred while deleting recipe",
    FAVORITE_FAILED: "Failed to update favorite",
    FAVORITE_UNEXPECTED: "Unexpected error occurred while updating favorite",
    REVIEW_FAILED: "Failed to add review",
    REVIEW_UNEXPECTED: "Unexpected error occurred while adding review",
} as const;

export const AUTH_MESSAGES = {
    LOGIN_FAILED: "Login failed. Please check your credentials.",
    REGISTER_FAILED: "Registration failed. Please try again.",
    LOGOUT_FAILED: "Logout failed.",
    OTP_VERIFICATION_FAILED: "OTP verification failed.",
    OTP_RESEND_FAILED: "Failed to resend OTP.",
    FORGOT_PASSWORD_FAILED: "Failed to process forgot password request.",
    RESET_PASSWORD_FAILED: "Failed to reset password.",
    FETCH_USER_FAILED: "Unable to retrieve current user details.",
} as const;

export const NUTRITION_MESSAGES = {
    FETCH_DAY_LOG_FAILED: "Failed to fetch daily nutrition log",
    FETCH_WEEK_LOGS_FAILED: "Failed to fetch weekly nutrition logs",
    LOG_MEAL_FAILED: "Failed to log meal",
    DELETE_MEAL_FAILED: "Failed to delete meal",
    UPDATE_TARGETS_FAILED: "Failed to update daily macro targets",
} as const;

export const AI_PLAN_MESSAGES = {
    GENERATE_FAILED: "Failed to generate AI plan",
    CREATE_DRAFT_FAILED: "Failed to create draft plan",
    FETCH_ACTIVE_FAILED: "Failed to fetch active plan",
    FETCH_HISTORY_FAILED: "Failed to fetch plan history",
    UPDATE_STATUS_FAILED: "Failed to update plan status",
    EDIT_FAILED: "Failed to edit plan",
    DELETE_FAILED: "Failed to delete plan",
} as const;

export const ONBOARDING_MESSAGES = {
    UPDATE_BODY_FAILED: "Failed to update body details",
    UPDATE_CYCLE_FAILED: "Failed to update cycle setup",
    UPDATE_GOALS_FAILED: "Failed to update goals",
    COMPLETE_FAILED: "Failed to complete onboarding",
    FETCH_STATUS_FAILED: "Failed to fetch onboarding status",
} as const;

export const TRAINER_AUTH_MESSAGES = {
    REGISTER_FAILED: "Trainer registration failed.",
    LOGIN_FAILED: "Trainer login failed.",
    OTP_FAILED: "OTP verification failed.",
    RESEND_OTP_FAILED: "Failed to resend OTP.",
    LOGOUT_FAILED: "Trainer logout failed.",
    FORGOT_PASSWORD_FAILED: "Failed to process forgot password.",
    RESET_PASSWORD_FAILED: "Failed to reset password.",
    FETCH_TRAINER_FAILED: "Unable to retrieve trainer details.",
} as const;

export const WORKOUT_MESSAGES = {
    FETCH_PROGRAM_FAILED: "Failed to fetch workout program",
    LOG_WORKOUT_FAILED: "Failed to log workout session",
    FETCH_HISTORY_FAILED: "Failed to fetch workout history",
} as const;

export const HEALTH_MESSAGES = {
    START_PERIOD_FAILED: "Failed to start period",
    END_PERIOD_FAILED: "Failed to end period",
    LOG_DAILY_FAILED: "Failed to save daily health log",
    ADD_WATER_FAILED: "Failed to log water intake",
} as const;

export const PROFILE_MESSAGES = {
    FETCH_FAILED: "Failed to fetch user profile",
    UPDATE_FAILED: "Failed to update profile",
    DELETE_ACCOUNT_FAILED: "Failed to delete account",
} as const;

export const COMMON_MESSAGES = {
    UNEXPECTED_ERROR: "An unexpected error occurred. Please try again.",
    NETWORK_ERROR: "Network error. Please check your connection.",
} as const;

export const MESSAGES = {
    RECIPES: RECIPE_MESSAGES,
    AUTH: AUTH_MESSAGES,
    ONBOARDING: ONBOARDING_MESSAGES,
    TRAINER_AUTH: TRAINER_AUTH_MESSAGES,
    WORKOUT: WORKOUT_MESSAGES,
    HEALTH: HEALTH_MESSAGES,
    NUTRITION: NUTRITION_MESSAGES,
    AI_PLAN: AI_PLAN_MESSAGES,
    PROFILE: PROFILE_MESSAGES,
    COMMON: COMMON_MESSAGES,
} as const;
