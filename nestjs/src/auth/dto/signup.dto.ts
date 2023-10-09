import { ApiProperty } from "@nestjs/swagger"

export class SignupDto {
    @ApiProperty({
        description: "Username",
        example: "harlock"
    })
    username: string

    @ApiProperty({
        description: "Password, should have at least: 8 characteres, 1 uppercase, 1 number",
        example: "Password123"
    })
    password: string
}