import { ApiProperty } from "@nestjs/swagger";

export default class SetAddressEventDto {
	@ApiProperty({
		description: 'Name of the event',
		type: 'string',
		example: 'Oktoberfest'
	})
	eventName: string
	
	@ApiProperty({
		description: 'Address of the event',
		type: 'string',
		example: '3 rue des rosiers, 75003, Paris'
	})
	address: string
}