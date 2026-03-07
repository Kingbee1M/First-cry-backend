import { IsEmail, IsIdentityCard, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, ValidateIf } from 'class-validator';

export class GetUserDto {

    @IsString()
    @IsNotEmpty()
    id: string

  @ValidateIf((o) => !o.phone)
  @IsEmail()
  email?: string;

  @ValidateIf((o) => !o.email)
  @IsPhoneNumber('NG')
  phone?: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1
  })
  password: string;
}