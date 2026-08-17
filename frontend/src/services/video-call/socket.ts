import {io} from "socket.io-client";
const token=localStorage.getItem("accessToken");
export const socket=io("http://localhost:3000",{
    auth:{
        token
    }
})
socket.on("connect",()=>{
    console.log("Socket connected",socket.id);
    
})
socket.on("connect-error",(error)=>{
    console.error(error.message);
    
})