import type { UpdateUserProfileDTO, UserProfileResponseDTO } from "../dtos/userprofile.dto.ts";
import type { IUser } from "../models/User.ts";

/**
 * Mapper for transforming user profile DTOs and domain entities.
 */
export class UserProfileMapper {
    /**
     * Converts a profile update DTO to a partial user entity.
     * @param dto - Update profile data transfer object
     */
    static toUpdateEntity(dto: UpdateUserProfileDTO): Partial<IUser> {
        return {
            ...(dto.firstName !== undefined && { firstName: dto.firstName }),
            ...(dto.lastName !== undefined && { lastName: dto.lastName }),
            ...(dto.bio !== undefined && { bio: dto.bio }),
            ...(dto.avatarUrl !== undefined && { avatarUrl: dto.avatarUrl }),
            ...(dto.avatarPublicId !== undefined && { avatarPublicId: dto.avatarPublicId }),

            ...(dto.bodyDetails !== undefined && {
                bodyDetails: {
                    ...(dto.bodyDetails.height !== undefined && {
                        height: dto.bodyDetails.height,
                    }),
                    ...(dto.bodyDetails.weight !== undefined && {
                        weight: dto.bodyDetails.weight,
                    }),
                    ...(dto.bodyDetails.dateOfBirth !== undefined && {
                        dateOfBirth: dto.bodyDetails.dateOfBirth,
                    }),
                    ...(dto.bodyDetails.biologicalSex !== undefined && {
                        biologicalSex: dto.bodyDetails.biologicalSex,
                    }),
                },
            }),

            ...(dto.cycleSetUp !== undefined && {
                cycleSetUp: {
                    ...(dto.cycleSetUp.averageCycleLength !== undefined && {
                        averageCycleLength: dto.cycleSetUp.averageCycleLength,
                    }),
                    ...(dto.cycleSetUp.averagePeriodLength !== undefined && {
                        averagePeriodLength: dto.cycleSetUp.averagePeriodLength,
                    }),
                    ...(dto.cycleSetUp.lastPeriodStart !== undefined && {
                        lastPeriodStart: dto.cycleSetUp.lastPeriodStart,
                    }),
                    ...(dto.cycleSetUp.birthControl !== undefined && {
                        birthControl: dto.cycleSetUp.birthControl,
                    }),
                },
            }),

            ...(dto.goals !== undefined && {
                goals: {
                    ...(dto.goals.primaryGoal !== undefined && {
                        primaryGoal: dto.goals.primaryGoal,
                    }),
                    ...(dto.goals.targetWeight !== undefined && {
                        targetWeight: dto.goals.targetWeight,
                    }),
                    ...(dto.goals.activityLevel !== undefined && {
                        activityLevel: dto.goals.activityLevel,
                    }),
                },
            }),
        } as unknown as Partial<IUser>;
    }

    /**
     * Converts a user entity to a user profile response DTO.
     * @param user - User domain entity
     */
    static toResponseDTO(user: IUser): UserProfileResponseDTO {
        return {
            id: user._id?.toString() || (user as any).id || "",
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            avatarUrl: user.avatarUrl,
            bio: user.bio,

            bodyDetails: user.bodyDetails,
            cycleSetUp: user.cycleSetUp,
            goals: user.goals,

            onboardingStep: user.onboardingStep,
            onboardingComplete: user.onboardingComplete,

            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        } as unknown as UserProfileResponseDTO;
    }
}