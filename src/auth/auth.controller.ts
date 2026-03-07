import { Controller, Post, Body } from '@nestjs/common';
import { GetUserDto } from './DTO/Get-user-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}
      @Post() 
  create(@Body() getUserDto: GetUserDto){
    return this.authService.signIn(getUserDto)
  }
}
