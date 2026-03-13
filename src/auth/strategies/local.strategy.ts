import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { loginDto } from '../DTO/login-user-dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'identifier' }); // use 'identifier' instead of 'username'
  }

  async validate(identifier: string, password: string) {
    const user = await this.authService.validateUser({ identifier, password });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user; // this becomes req.user
  }
}