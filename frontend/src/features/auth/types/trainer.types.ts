export interface VerifyTrainerInviteResponse {
  firstName: string;
  lastName: string;
  email: string;
}

export interface RegisterTrainerInviteDTO {
  token: string;
  password: string;
}
