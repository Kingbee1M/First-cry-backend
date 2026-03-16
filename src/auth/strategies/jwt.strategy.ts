import type { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtPayload } from "../auth-jwtPayload";
import jwtConfig from "../config/jwt.config";
import { Inject, Injectable } from "@nestjs/common";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(@Inject(jwtConfig.KEY) private jwtservice: ConfigType<typeof jwtConfig>,
                private authService: AuthService
) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtservice.secret as string
        })
    }
    async validate(payload: jwtPayload) {
        const user_id = payload.sub
        const user = await this.authService.validatejwtUser(user_id);
        
        console.log('User found in Strategy:', user); 
        return user;
        
    }
}