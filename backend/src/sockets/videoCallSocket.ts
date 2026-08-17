import type { Server,Socket } from "socket.io";
import { getUserSocket } from "./socketRegistry.js";
export const registervideoCallSocket=(io:Server,socket:Socket)=>{
console.log("videp call is connected",socket.id);
socket.on("call-user",(data)=>{
    const recieverSocketId=getUserSocket(data?.receiverId);
    if(!recieverSocketId)
    {
        socket.emit("call-error",{
            message:"User is not online"
        });
        return
    }
    io.to(recieverSocketId).emit("incoming-call",{
        callerId:socket.data.user?.userId,
        offer:data.offer
    })

    
    
    
})
}