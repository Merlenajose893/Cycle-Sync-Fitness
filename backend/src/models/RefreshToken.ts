import { Schema,model,Types,Document } from "mongoose";
export type UserType=|"user"|"admin"|"trainer";
export interface IRefreshToken extends Document{
    tokenHash:string;
    userId:Types.ObjectId,
    userType:UserType,
    expiresAt:Date;

}

export const refreshToken=new Schema<IRefreshToken>({
    tokenHash:{
        type:String,
        required:true
    },
   userId: {
    type:Schema.Types.ObjectId,
    required:true
    },
    userType:{
        type:String,
        enum:["user","trainer","admin"],
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    }
},{timestamps:true})

export const RefreshTokenModel =
  model<IRefreshToken>(
    "RefreshToken",
    refreshToken
  );