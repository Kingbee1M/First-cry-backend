import { Controller, Post, Body, UseGuards, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { loginDto } from './DTO/login-user-dto';
import { AuthService } from './auth.service';
import { createUserDto } from './DTO/create-user-dto';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from '@nestjs/common';
import { RefreshJwtGuard } from './guards/refresh-jwt/refresh-jwt.guard';


@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @Post()
  loginUser(@Request() req) {
    const data = this.authService.login(req.user);
    return { message: 'success', 
      user_id: req.user.user_id, 
      firstName: req.user.firstName, 
      lastName: req.user.lastName, 
      email: req.user.email, 
      token_data: data};
  }

  @Post('signup')
  createUser(@Body() createUserDto: createUserDto){
    return this.authService.signUp(createUserDto)
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }  

}
