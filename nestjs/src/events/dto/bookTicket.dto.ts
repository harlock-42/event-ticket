import { ApiProperty } from "@nestjs/swagger";

export default class BookTicketDto {
    @ApiProperty({
        description: 'Name of the event to book',
        type: 'string',
        example: 'Oktoberfest'
    })
    eventName: string
}