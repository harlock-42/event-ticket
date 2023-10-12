import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class BookTicketDto {
    @ApiProperty({
        description: 'Name of the event to book. Must be a string',
        type: 'string',
        example: 'Oktoberfest'
    })
    @IsNotEmpty()
    @IsString()
    eventName: string
}