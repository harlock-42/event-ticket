import { Body, Controller, Get, HttpException, HttpStatus, Post, Put, Query } from "@nestjs/common";
import EventService from "./event.service";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import CreateEventDto from "./dto/createEvent.dto";
import { CurrentUser } from "src/auth/decorator/CurrentUser.decorator";
import CurrentUserDto from "src/auth/dto/currentUser.dto";
import CountTicketsDto from "./dto/countTickets.dto";
import { Public } from "src/auth/decorator/isPublic.decorator";
import BookTicketDto from "./dto/bookTicket.dto";
import RemoveBookingDto from "./dto/removeBooking.dto";
import SetNameEventDto from "./dto/setEventProperties.dto";
import SetEventPropertiesDto from "./dto/setEventProperties.dto";

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
        try {
            return
            return this.eventService.createOne(createEventDto, user.sub)
        } catch (error) {
            if (error instanceof HttpException) {
                throw new HttpException(error.getResponse(), error.getStatus())
            } else {
                throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @ApiOperation({ summary: 'Book a ticker by a user'})
    @ApiBody({
        type: BookTicketDto
    })
    @ApiBearerAuth()
    @Post('book')
    async bookOne(@Body() bookTicketDto: BookTicketDto, @CurrentUser() user: CurrentUserDto) {
        try {
            return this.eventService.bookOne(bookTicketDto.eventName, user.sub)
        } catch (error) {
            if (error instanceof HttpException) {
                throw new HttpException(error.getResponse(), error.getStatus())
            } else {
                throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
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
        try {
            return this.eventService.countTickets(countTicketsDto.name)
        } catch (error) {
            if (error instanceof HttpException) {
                throw new HttpException(error.getResponse(), error.getStatus())
            } else {
                throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @ApiOperation({ summary: 'Remove a user from a ticket'})
    @ApiBody({
        type: RemoveBookingDto
    })
    @ApiBearerAuth()
    @Put('removeBooking')
    async removeBooking(@Body() removeBookingDto: RemoveBookingDto, @CurrentUser() user: CurrentUserDto) {
        try {
            return this.eventService.removeBooking(user.sub, removeBookingDto.eventName)
        } catch (error) {
            if (error instanceof HttpException) {
                throw new HttpException(error.getResponse(), error.getStatus())
            } else {
                throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    /*
    ** Set new properties to an event if the user is the owner of the event.
    */
    @ApiOperation({ summary: 'Set new properties to an event'})
    @ApiBody({
        type: SetEventPropertiesDto
    })
    @ApiBearerAuth()
    @Put('setProperties')
    async setEventProperties(@Body() setNameEventDto: SetNameEventDto, @CurrentUser() user: CurrentUserDto) {
        try {
            return this.eventService.setEventProperties(setNameEventDto, user.sub)
        } catch (error) {
            if (error instanceof HttpException) {
                throw new HttpException(error.getResponse(), error.getStatus())
            } else {
                throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

}