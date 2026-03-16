import { Module, Post, Body } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';;
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import refreshJwtConfig from './config/refresh.jwt.config';
import { refreshJwtStrategy } from './strategies/refresh.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.registerAsync(jwtConfig.asProvider()),
  ConfigModule.forFeature(jwtConfig),
  ConfigModule.forFeature(refreshJwtConfig),
],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, refreshJwtStrategy]
})
export class AuthModule {}
