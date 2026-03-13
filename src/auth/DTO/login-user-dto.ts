import { IsDefined, IsString, IsStrongPassword, IsNotEmpty, isDefined, isNotEmpty } from "class-validator"

export class loginDto{
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    identifier: string

    @IsNotEmpty()
    @IsString()
    // @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, })
    password: string
}