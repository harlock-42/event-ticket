import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, MinDate } from "class-validator"

export default class SetEventPropertiesDto {
	@ApiProperty({
		description: 'Name of the event',
		type: 'string',
		example: 'Oktoberfest'
	})
	eventName: string

	@ApiProperty({
		description: 'New name of the event',
		type: 'string',
		example: 'Afterwork'
	})
	newName?: string

    @ApiProperty({
		description: 'Name of the event',
		type: 'string',
		example: 'Oktoberfest'
	})
    @IsOptional()
	newDate?: Date

    @ApiProperty({
		description: 'Address of the event',
		type: 'string',
		example: '3 rue des rosiers, 75003, Paris'
	})
	newAddress?: string
}