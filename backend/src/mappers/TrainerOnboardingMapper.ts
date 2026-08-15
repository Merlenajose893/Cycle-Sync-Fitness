import type { UpdateTrainerCertificateDTO, UpdateTrainerPackageDTO, UpdateTrainerProfileDTO } from "../dtos/traineronboarding.dto.js";

/**
 * Mapper for transforming trainer onboarding DTOs into domain objects.
 */
export class TrainerOnboardingMapper {
    /**
     * Maps trainer profile DTO to profile fields.
     * @param dto - Profile data transfer object
     */
    static toTrainerProfile(dto: UpdateTrainerProfileDTO) {
        return {
            bio: dto.bio,
            experience: dto.experience,
            avatar: dto.avatar,
            speciality: dto.speciality,
            location: dto.location,
            languages: dto.languages,
            tags: dto.tags
        };
    }

    /**
     * Maps trainer certifications DTO to certification array.
     * @param dto - Certifications data transfer object
     */
    static toTrainerCertifications(dto: UpdateTrainerCertificateDTO) {
        return {
            certifications: dto.certifications.map((cert) => ({
                title: cert.title,
                issuedBy: cert.issuedBy,
                year: cert.year
            }))
        };
    }

    /**
     * Maps trainer packages DTO to package array.
     * @param dto - Package data transfer object
     */
    static toTrainerPackages(dto: UpdateTrainerPackageDTO) {
        return {
            packages: dto.packages.map((pkg) => ({
                name: pkg.name,
                sessions: pkg.sessions,
                duration: pkg.duration,
                price: pkg.price,
                ...(pkg.popular !== undefined && { popular: pkg.popular })
            }))
        };
    }
}