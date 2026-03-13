import { IsDefined, IsEmail, IsNumber, IsPhoneNumber, IsString, IsStrongPassword, IsNotEmpty } from "class-validator"
export enum roles {
    User = 'user',
    Seller = 'seller',
    Admin = 'admin'
}

export class createUserDto {
    @IsString()
    @IsNotEmpty()
    user_id: string

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    firstName: string

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    lastName: string

    @IsEmail()
    email: string

    @IsPhoneNumber('NG')
    phone: string

    @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, })
    password: string

    @IsString()
    role: roles

    @IsNumber()
    age: number

}