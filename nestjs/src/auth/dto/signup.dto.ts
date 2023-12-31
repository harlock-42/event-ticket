import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator"

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Username",
        type: 'string',
        example: "harlock"
    })
    username: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    /*
    ** (?=.*[A-Z]) = check if the string has at least one uppercase
    ** (?=.*\d) = check if the string has at least on number
    */
    @Matches(/(?=.*[A-Z])(?=.*\d)/, {
        message: 'The string must have at least one uppercase and one digit'
    })
    @ApiProperty({
        description: "Password, should have at least: 8 characters, 1 uppercase, 1 number",
        type: 'string',
        example: "Password123"
    })
    password: string
}