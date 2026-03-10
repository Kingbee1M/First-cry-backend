import { Controller, Post, Body } from '@nestjs/common';
import { GetUserDto } from './DTO/Get-user-dto';
import { AuthService } from './auth.service';
import { createUserDto } from './DTO/create-user-dto';

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post() 
  LoginUser(@Body() getUserDto: GetUserDto){
    return this.authService.signIn(getUserDto)
  }

  @Post('signup')
  createUser(@Body() createUserDto: createUserDto){
    return this.authService.signUp(createUserDto)
  }
}
