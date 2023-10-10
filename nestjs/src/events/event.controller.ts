import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import EventService from "./event.service";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import CreateEventDto from "./dto/createEvent.dto";
import { CurrentUser } from "src/auth/decorator/CurrentUser.decorator";
import CurrentUserDto from "src/auth/dto/currentUser.dto";
import CountTicketsDto from "./dto/countTickets.dto";
import { Public } from "src/auth/decorator/isPublic.decorator";

@ApiTags('Events')
@Controller('event')
export default class EventController {
    constructor(
        private readonly eventService: EventService
    ) {}

    @ApiOperation({ summary: 'Create a new Event\'s instance' })
    @ApiBody({
        type: CreateEventDto
    })
    @ApiBearerAuth()
    @Post('one')
    async createOne(@Body() createEventDto: CreateEventDto, @CurrentUser() user: CurrentUserDto) {
        // console.log(user)
        return this.eventService.createOne(createEventDto, user.username)
    }

    @ApiOperation({ summary: 'Get the number of ticket still available for an event' })
    @ApiQuery({
        name: 'name',
        type: 'string',
        description: 'Name of the event'
    })
    @Public()
    @Get('nbTickets')
    async countTickets(@Query() countTicketsDto: CountTicketsDto) {
        return this.eventService.countTickets(countTicketsDto.name)
    }
}