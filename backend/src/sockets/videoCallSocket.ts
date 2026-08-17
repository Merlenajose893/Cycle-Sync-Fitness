import type { Server,Socket } from "socket.io";
export const registervideoCallSocket=(io:Server,socket:Socket)=>{
console.log("videp call is connected",socket.id);

}