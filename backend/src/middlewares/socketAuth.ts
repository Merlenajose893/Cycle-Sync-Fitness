import type { Socket } from "socket.io";
import jwt from "jsonwebtoken";
import type { TokenPayload } from "../types/auth.types.js";

export const socketAuth = (socket: Socket, next: (err?: Error) => void) => {
  console.log("Socket authentication check...");

  // 1. Check token from handshake auth object
  let token = socket.handshake.auth?.token;

  // 2. Fallback: check token from HTTP cookies in handshake headers
  if (!token && socket.handshake.headers.cookie) {
    const cookies = socket.handshake.headers.cookie.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "access_token") {
        token = value;
        break;
      }
    }
  }

  // 3. Verify token presence
  if (!token) {
    console.error("Socket Auth Error: No token provided in handshake");
    return next(new Error("Authentication error: Token missing"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
    socket.data.user = decoded;
    console.log(`Socket Auth Success for user: ${decoded.userId || decoded.id}`);
    next();
  } catch (error) {
    console.error("Socket Auth Error: Invalid token", error);
    return next(new Error("Authentication error: Invalid or expired token"));
  }
};