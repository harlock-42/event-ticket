import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsDate, IsDateString, IsDefined, IsEmpty, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsString, Max, Min, MinDate, ValidationArguments } from "class-validator"
import { toDate, toNumber } from "src/utils/cast.helper"

export default class CreateEventDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Name of the event, must be a string',
        type: 'string',
        example: 'Oktoberfest'
    })
    name: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Address of the event, must be a string',
        type: 'string',
        example: '96 boulevard bessiere, 75003, Paris'
    })
    address: string

    @IsNotEmpty()
    @Transform(({ value }) => toDate(value)) // Cast property into Date type
    @IsDate() // Check if the cast works
    @MinDate(new Date())
    @ApiProperty({
        description: 'Date of the event. Must be a Date format. You have to choose a date in the future.',
        type: 'date',
        example: '2023-10-18T15:00:00'
    })
    dateEvent: Date

    @IsNotEmpty()
    @IsInt()
    @Min(1, {
        message: (args: ValidationArguments) => {
            if (args.value < 0) {
                return 'The value must be positive'
            } else {
                return 'The value cannot be zero'
            }
        } 
    })
    @Max(1000000)
    @ApiProperty({
        description: 'Number of tickets available. Must be an integer with a value upper than 0.',
        type: 'number',
        example: 3
    })
    nbTickets: number
}