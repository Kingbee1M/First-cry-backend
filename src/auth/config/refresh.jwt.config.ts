import { registerAs } from "@nestjs/config";
import { JwtModuleOptions, JwtSignOptions } from "@nestjs/jwt";
import { sign } from "crypto";

export default registerAs('refreshJwt', () => ({
    secret: process.env.REFRESH_JWT_SECRET_KEY,
    expiresIn: process.env.REFRESH_JWT_EXPIRES_IN as any,
}))