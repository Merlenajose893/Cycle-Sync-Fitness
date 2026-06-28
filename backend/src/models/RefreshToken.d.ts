import { Schema, Types, Document } from "mongoose";
export type UserType = "user" | "admin" | "trainer";
export interface IRefreshToken extends Document {
    tokenHash: string;
    userId: Types.ObjectId;
    userType: UserType;
    expiresAt: Date;
}
export declare const refreshToken: Schema<IRefreshToken, import("mongoose").Model<IRefreshToken, any, any, any, any, any, IRefreshToken>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IRefreshToken, Document<unknown, {}, IRefreshToken, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<IRefreshToken & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, IRefreshToken, Document<unknown, {}, IRefreshToken, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<IRefreshToken & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, IRefreshToken, Document<unknown, {}, IRefreshToken, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<IRefreshToken & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    userType?: import("mongoose").SchemaDefinitionProperty<UserType, IRefreshToken, Document<unknown, {}, IRefreshToken, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<IRefreshToken & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    expiresAt?: import("mongoose").SchemaDefinitionProperty<Date, IRefreshToken, Document<unknown, {}, IRefreshToken, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<IRefreshToken & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    tokenHash?: import("mongoose").SchemaDefinitionProperty<string, IRefreshToken, Document<unknown, {}, IRefreshToken, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<IRefreshToken & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, IRefreshToken>;
export declare const RefreshTokenModel: import("mongoose").Model<IRefreshToken, {}, {}, {}, Document<unknown, {}, IRefreshToken, {}, import("mongoose").DefaultSchemaOptions> & IRefreshToken & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IRefreshToken>;
//# sourceMappingURL=RefreshToken.d.ts.map