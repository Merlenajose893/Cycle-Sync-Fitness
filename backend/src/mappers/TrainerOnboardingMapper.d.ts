import type { UpdateTrainerCertificateDTO, UpdateTrainerPackageDTO, UpdateTrainerProfileDTO } from "../dtos/traineronboarding.dto.js";
export declare class TrainerOnboardingMapper {
    static toTrainerProfile(dto: UpdateTrainerProfileDTO): {
        bio: string | undefined;
        experience: string | undefined;
        avatar: string | undefined;
        speciality: string | undefined;
        location: string | undefined;
        languages: string[] | undefined;
        tags: string[] | undefined;
    };
    static toTrainerCertifications(dto: UpdateTrainerCertificateDTO): {
        certifications: {
            title: string;
            issuedBy: string;
            year: string;
        }[];
    };
    static toTrainerPackages(dto: UpdateTrainerPackageDTO): {
        packages: {
            popular?: boolean;
            name: string;
            sessions: number;
            duration: string;
            price: number;
        }[];
    };
}
//# sourceMappingURL=TrainerOnboardingMapper.d.ts.map