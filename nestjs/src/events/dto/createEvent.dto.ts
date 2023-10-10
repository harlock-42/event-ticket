import { ApiProperty } from "@nestjs/swagger"
import { IsEmpty, IsNotEmpty } from "class-validator"

export default class CreateEventDto {
    @IsNotEmpty()
    @ApiProperty({
        description: 'Name of the event',
        example: 'Oktoberfest'
    })
    name: string

    @IsNotEmpty()
    @ApiProperty({
        description: 'Address of the event',
        example: '96 boulevard bessiere, 75003, Paris'
    })
    address: string

    @IsNotEmpty()
    @ApiProperty({
        description: 'Date of the event',
        example: '2023-10-18T15:00:00'
    })
    dateEvent: Date

    @IsNotEmpty()
    @ApiProperty({
        description: 'Number of tickets available',
        example: 3
    })
    nbTickets: number
}