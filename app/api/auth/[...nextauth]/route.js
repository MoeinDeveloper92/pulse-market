import { authOptions } from "@/utils/authOptions";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions)


//whether is POST or GET
export { handler as GET, handler as POST }