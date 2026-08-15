import type { UpdateUserProfileDTO, UserProfileResponseDTO } from "../dtos/userprofile.dto.js";
import type { IUser } from "../models/User.js";
export declare class UserProfileMapper {
    static toUpdateEntity(dto: UpdateUserProfileDTO): Partial<IUser>;
    static toResponseDTO(user: IUser): UserProfileResponseDTO;
}
//# sourceMappingURL=UserProfileMappers.d.ts.map