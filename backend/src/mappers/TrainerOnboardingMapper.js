export class TrainerOnboardingMapper {
    static toTrainerProfile(dto) {
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
    static toTrainerCertifications(dto) {
        return {
            certifications: dto.certifications.map((cert) => ({
                title: cert.title,
                issuedBy: cert.issuedBy,
                year: cert.year
            }))
        };
    }
    static toTrainerPackages(dto) {
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
//# sourceMappingURL=TrainerOnboardingMapper.js.map