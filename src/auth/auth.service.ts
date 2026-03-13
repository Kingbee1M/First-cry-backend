import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'users.entity';
import { createUserDto } from './DTO/create-user-dto';
import { hashPassword, comparePassword } from 'src/helpers/hasing.helper';
import { loginDto } from './DTO/login-user-dto';
import { JwtService } from '@nestjs/jwt';
import type { ConfigType } from '@nestjs/config';
import  jwtConfig from './config/jwt.config';
import { Inject } from '@nestjs/common';

@Injectable()
export class AuthService {
      constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguraton: ConfigType<typeof jwtConfig>
      ) {}

      async validateUser(logindto: loginDto) {
      const user = await this.usersRepository.findOne({
        where: [
          { email: logindto.identifier },
          { phone: logindto.identifier }
        ]
      });
      
      if (!user) {
        return null;
      }

      const isPasswordValid = await comparePassword(logindto.password, user.password);

      if (!isPasswordValid) {
        return null;
      }

      return user;
    }

    login(user: User) {
      const payload = { sub: user.user_id };
      console.log("JWT EXPIRES:", this.jwtConfiguraton.signOptions?.expiresIn);
  console.log("JWT SECRET:", this.jwtConfiguraton.secret);
      return this.jwtService.sign(payload);
    }


    async signUp(createuserdto: createUserDto) {
        const existingUser = await this.usersRepository.findOne({ where: { email: createuserdto.email } });
        if (existingUser) {
          throw new Error('Email already exists');
        }
        createuserdto.password = await hashPassword(createuserdto.password);
        const user = this.usersRepository.create(createuserdto);
        return {message: "sucess",user: await this.usersRepository.save(user)};
      }
}
