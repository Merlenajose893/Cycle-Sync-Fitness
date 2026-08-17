const userSockets=new Map<String,string>();
export const addUserSocket=(userId:string,socketId:string)=>{
    userSockets.set(userId,socketId)
}
export const getUserSocket=(userId:string)=>{
return userSockets.get(userId);
};
export const removeUserSocket=(userId:string)=>{
userSockets.delete(userId)
}
