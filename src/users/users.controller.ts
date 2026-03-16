import { Body, Controller, Get, Param, Post, Delete, UseGuards, Request, SetMetadata } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './DTO/create-user-dto';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { UserRole } from 'src/auth/enums/role.enums';
import { RoleGuard } from 'src/auth/guards/role.guard.ts/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}

    @UseGuards(RoleGuard)
    @Roles(UserRole.Admin)
    @UseGuards(JwtAuthGuard)
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

    @UseGuards(RoleGuard)
    @Roles(UserRole.Admin)
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(id)
    }
}
