import { Body, Controller, Post } from "@nestjs/common";
import EventService from "./event.service";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import CreateEventDto from "./dto/createEvent.dto";
import { CurrentUser } from "src/auth/decorator/CurrentUser.decorator";
import CurrentUserDto from "src/auth/dto/currentUser.dto";

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
        return this.eventService.createOne(createEventDto, user.sub)
    }
}