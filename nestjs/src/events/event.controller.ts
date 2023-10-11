import { Body, Controller, Get, Post, Put, Query } from "@nestjs/common";
import EventService from "./event.service";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import CreateEventDto from "./dto/createEvent.dto";
import { CurrentUser } from "src/auth/decorator/CurrentUser.decorator";
import CurrentUserDto from "src/auth/dto/currentUser.dto";
import CountTicketsDto from "./dto/countTickets.dto";
import { Public } from "src/auth/decorator/isPublic.decorator";
import BookTicketDto from "./dto/bookTicket.dto";
import RemoveBookingDto from "./dto/removeBooking.dto";
import SetNameEventDto from "./dto/setNameEvent.dto";
import SetDateEventDto from "./dto/setDateEvent.dto";
import SetAddressEventDto from "./dto/setAddressEvent.dto";

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
        return this.eventService.createOne(createEventDto, user.sub)
    }

    @ApiOperation({ summary: 'Book a ticker by a user'})
    @ApiBody({
        type: BookTicketDto
    })
    @ApiBearerAuth()
    @Post('book')
    async bookOne(@Body() bookTicketDto: BookTicketDto, @CurrentUser() user: CurrentUserDto) {
        return this.eventService.bookOne(bookTicketDto.eventName, user.sub)
    }

    @ApiOperation({ summary: 'Get the number of ticket still available for an event' })
    @ApiQuery({
        name: 'name',
        type: 'string',
        description: 'Name of the event',
        example: 'Oktoberfest'
    })
    @Public()
    @Get('nbTickets')
    async countTickets(@Query() countTicketsDto: CountTicketsDto) {
        return this.eventService.countTickets(countTicketsDto.name)
    }

    @ApiOperation({ summary: 'Remove a user from a ticket'})
    @ApiBody({
        type: RemoveBookingDto
    })
    @ApiBearerAuth()
    @Put('removeBooking')
    async removeBooking(@Body() removeBookingDto: RemoveBookingDto, @CurrentUser() user: CurrentUserDto) {
        return this.eventService.removeBooking(user.sub, removeBookingDto.eventName)
    }

    /*
    ** Set a new name to an event if the user is the owner of the event
    */
    @ApiOperation({ summary: 'Set a new name to an event'})
    @ApiBody({
        type: SetNameEventDto
    })
    @ApiBearerAuth()
    @Put('setName')
    async setName(@Body() setNameEventDto: SetNameEventDto, @CurrentUser() user: CurrentUserDto) {
        return this.eventService.setNameEvent(setNameEventDto, user.sub)
    }
    
    /*
    ** Set a new date to an event if the user is the owner of the event
    */
    @ApiOperation({ summary: 'Set a new name to an event'})
    @ApiBody({
        type: SetNameEventDto
    })
    @ApiBearerAuth()
    @Put('setName')
    async setDate(@Body() setDateEventDto: SetDateEventDto, @CurrentUser() user: CurrentUserDto) {
        
    }

    /*
    ** Set a new address to an event if the user is the owner of the event
    */
    @ApiOperation({ summary: 'Set a new name to an event'})
    @ApiBody({
        type: SetNameEventDto
    })
    @ApiBearerAuth()
    @Put('setName')
    async setAddress(@Body() setNameEventDto: SetAddressEventDto, @CurrentUser() user: CurrentUserDto) {
        
    }

}