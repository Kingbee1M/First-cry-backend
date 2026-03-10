import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'users.entity';
import { GetUserDto } from './DTO/Get-user-dto';
import { createUserDto } from './DTO/create-user-dto';
@Injectable()
export class AuthService {
      constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
      ) {}

    async signIn(getUserDto: GetUserDto) {
        const user = await this.usersRepository.findOne({ where: { email: getUserDto.email, password: getUserDto.password, phone: getUserDto.phone } });
        if (!user) {
          throw new Error('Invalid credentials');
        }
        return {message: "sucess", user: user}
    }

    async signUp(getUserDto: createUserDto) {
        const existingUser = await this.usersRepository.findOne({ where: { email: getUserDto.email } });
        if (existingUser) {
          throw new Error('Email already exists');
        }
        const user = this.usersRepository.create(getUserDto);
        return {message: "sucess",user: await this.usersRepository.save(user)};
      }
}
