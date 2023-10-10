import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Username",
        example: "harlock"
    })
    username: string

    @IsNotEmpty()
    @IsString()
    // TODO validate password
    @ApiProperty({
        description: "Password, should have at least: 8 characteres, 1 uppercase, 1 number",
        example: "Password123"
    })
    password: string
}