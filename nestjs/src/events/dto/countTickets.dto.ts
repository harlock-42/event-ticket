import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class CountTicketsDto {
    @ApiProperty({
        description: 'Name of the event. Must be a string',
        type: 'string',
        example: 'Oktoberfest'
    })
    @IsNotEmpty()
    @IsString()
	name: string
}