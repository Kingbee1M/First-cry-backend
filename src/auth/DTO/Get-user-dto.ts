import { IsDefined, IsEmail, IsNumber, IsPhoneNumber, IsString, IsStrongPassword, IsNotEmpty } from "class-validator"
import { UserRole } from "../enums/role.enums"

export class getUserDto {

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    user_id: string

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    firstName?: string

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    lastName?: string

    @IsEmail()
    email?: string

    @IsString()
    role?: UserRole


}