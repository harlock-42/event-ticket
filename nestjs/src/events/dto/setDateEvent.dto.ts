import { ApiProperty } from "@nestjs/swagger";

export default class SetDateEventDto {
	@ApiProperty({
		description: 'Name of the event',
		type: 'string',
		example: 'Oktoberfest'
	})
	eventName: string

	@ApiProperty({
		description: 'Name of the event',
		type: 'string',
		example: 'Oktoberfest'
	})
	newDate: Date
}