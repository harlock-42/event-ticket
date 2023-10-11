import { ApiProperty } from "@nestjs/swagger"

export default class SetNameEventDto {
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
	newName: string
}