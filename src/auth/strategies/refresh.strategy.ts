import type { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtPayload } from "../auth-jwtPayload";
import refreshJwtConfig from "../config/refresh.jwt.config";
 import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class refreshJwtStrategy extends PassportStrategy(Strategy, "jwt-refresh"){
    constructor(@Inject(refreshJwtConfig.KEY) private refreshService: ConfigType<typeof refreshJwtConfig>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: refreshService.secret as string
        })
    }
    validate(payload: jwtPayload) {
        return {user_id: payload.sub}
    }
}