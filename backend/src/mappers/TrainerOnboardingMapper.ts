import type { UpdateTrainerCertificateDTO, UpdateTrainerPackageDTO, UpdateTrainerProfileDTO } from "../dtos/traineronboarding.dto.js";

export class TrainerOnboardingMapper{
    static toTrainerProfile(dto:UpdateTrainerProfileDTO)
    {
        return{
            bio:dto.bio,
            experience:dto.experience,
            avatar:dto.avatar,
            speciality:dto.speciality,
            location:dto.loaction,
            languages:dto.languages,
            tags:dto.tags
        }
    }

    static toTrainerCertifications(dto:UpdateTrainerCertificateDTO)
    {
        return {
            certifications:dto.certifications.map((cert)=>({
                title:cert.title,
                issuedBy:cert.issuedBy,
                year:cert.year
            }))
        }
    }

    static toTrainerPackages(dto:UpdateTrainerPackageDTO)
    {
        return {
            packages:dto.packages.map((pkg)=>({
                name:pkg.name,
                sessions:pkg.sessions,
                duration:pkg.duration,
                price:pkg.price,
                ...(pkg.popular!==undefined && {popular:pkg.popular})
            }))
        }
    }
}