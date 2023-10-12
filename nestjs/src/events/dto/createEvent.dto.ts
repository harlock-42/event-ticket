import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsDate, IsDateString, IsDefined, IsEmpty, IsNotEmpty, IsString, MinDate } from "class-validator"
import { toDate } from "src/utils/cast.helper"

export default class CreateEventDto {
    @IsNotEmpty()
    @IsString()
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
    @Transform(({ value }) => toDate(value)) // Cast property into Date type
    @IsDate()
    @MinDate(new Date())
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