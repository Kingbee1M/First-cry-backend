import { IsEmail, IsIdentityCard, isNotEmpty, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, IsStrongPassword, ValidateIf } from 'class-validator';

export class GetUserDto {

    @IsString()
    @IsNotEmpty()
    id: string

  @IsNotEmpty()
  @IsString()
  identifier: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1
  })
  password: string;
}