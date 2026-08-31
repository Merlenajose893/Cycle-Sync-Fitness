import { TrainerStatus } from "./TrainerStatus.ts"
export const TRAINER_NEXT_STEP={
[TrainerStatus.REGISTERED]:"/trainer/onboarding",
[TrainerStatus.PENDING_APPROVAL]:"/trainer/pending",
[TrainerStatus.ACTIVE]:"/trainer",
[TrainerStatus.REJECTED]:"/trainer/rejected",
[TrainerStatus.BLOCKED]:"/trainer/blocked"

}