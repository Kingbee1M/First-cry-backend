import { Body, Controller, Get, Param, Post, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './DTO/create-user-dto';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';


@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}
    @Get()
    FindAll() {
        return this.usersService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get(':email')
    async findone(@Request() req) {
        const user = await this.usersService.findOne(req.email)
        return {user_id: user.user_id, email: user.email, phone: user.phone, role: user.role}
    }

    @Post()
    create(@Body(ValidationPipe) createUser: createUserDto) {
        return this.usersService.create(createUser)
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(id)
    }
}
