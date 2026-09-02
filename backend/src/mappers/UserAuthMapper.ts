
import type { RegisterUserDTO, RegisterUserResponse } from "../dtos/auth.dto.ts";
import type { IUser } from "../models/User.ts";

export class UserAuthMapper {
    static toRegisterUser(dto: RegisterUserDTO) {
        return {
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            password: dto.password
        };
    }

    static toRegisterResponse(user: IUser): RegisterUserResponse {
        return {
            id: user._id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            isEmailVerified: user.isEmailVerified
        };
    }

    // Retain legacy method aliases for backward compatibility if needed
    static toregisterUser(dto: RegisterUserDTO) {
        return this.toRegisterUser(dto);
    }

    static toregisterResponse(user: IUser): RegisterUserResponse {
        return this.toRegisterResponse(user);
    }
}