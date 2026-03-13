import { registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";
import { sign } from "crypto";

export default registerAs(
    'jwt',
    (): JwtModuleOptions => ({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN as any,
    }
}))