import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator"

export class SigninDto {
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
    @ApiProperty({
        description: "Password, should have at least: 8 characters, 1 uppercase, 1 number",
        type: 'string',
        example: "Password123"
    })
    password: string
}