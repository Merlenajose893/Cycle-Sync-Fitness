export interface CreatePackageDTO {
    packageName: string;
    description: string;
    durationDays: number;
    price: number;
    features: string[];
    maxClients?: number;
}
export interface UpdatePackageDTO extends Partial<CreatePackageDTO> {
    isActive?: boolean;
}
//# sourceMappingURL=trainerPackage.dto.d.ts.map