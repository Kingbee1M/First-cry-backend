import type { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtPayload } from "../auth-jwtPayload";
import jwtConfig from "../config/jwt.config";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(@Inject(jwtConfig.KEY) private jwtservice: ConfigType<typeof jwtConfig>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtservice.secret as string
        })
    }
    validate(payload: jwtPayload) {
        return {user_id: payload.sub}
    }
}