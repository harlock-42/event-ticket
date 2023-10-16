import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsDate, IsNotEmpty, IsOptional, IsString, MinDate, isString } from "class-validator"
import { toDate } from "src/utils/cast.helper"

export default class SetEventPropertiesDto {
	@IsNotEmpty()
	@IsString()
	@ApiProperty({
		description: 'Name of the event',
		type: 'string',
		example: 'Oktoberfest'
	})
	eventName: string

	@IsOptional()
	@IsString()
	@ApiProperty({
		description: 'New name of the event',
		type: 'string',
		example: 'Afterwork'
	})
	newName?: string

	@IsOptional()
    @Transform(({ value }) => toDate(value)) // Cast property into Date type
    @IsDate() // Check if the cast works
    @MinDate(new Date())
    @ApiProperty({
		description: 'Name of the event',
		type: 'string',
		example: '2023-10-18T15:00:00'
	})
	newDate?: Date

	@IsOptional()
	@IsString()
	@ApiProperty({
		description: 'Address of the event',
		type: 'string',
		example: '3 rue des rosiers, 75003, Paris'
	})
	newAddress?: string
}