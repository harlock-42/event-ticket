import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class RemoveBookingDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Event name to remove. The event must exist to be remove",
        type: 'string',
        example: 'Oktoberfest'
    })
    eventName: string
}