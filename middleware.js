export { default } from "next-auth/middleware"
export const config = {
    //it will any url that we want to protect
    matcher: ["/properties/add", "/profile", "/properties/saved", "/messages"]
}