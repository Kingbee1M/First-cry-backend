import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './DTO/create-user-dto';

@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}
    @Get()
    FindAll() {
        return this.usersService.findAll()
    }

    @Get(':email')
    findone(@Param('email') email: string) {
        return this.usersService.findOne(email)
    }

    @Post()
    create(@Body() createUser: createUserDto) {
        return this.usersService.create(createUser)
    }
}
