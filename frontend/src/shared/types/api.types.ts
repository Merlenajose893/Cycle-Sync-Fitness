/**
 * Shared API response envelope used across all features.
 * Consolidated from duplicated definitions in auth.types, admin.types, and useronboarding.types.
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
