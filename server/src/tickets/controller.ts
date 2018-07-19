import {
  JsonController,
  Get,
  Post,
  HttpCode,
  Param,
  Body,
  Put,
  NotFoundError,
  Authorized,
  CurrentUser
} from "routing-controllers";
import Ticket from "./entity";
// import User from "../users/entity";
import Event from "../events/entity";

@JsonController()
export default class TicketController {
  @Get("/tickets/:id")
  async getTicket(@Param("id") id: number) {
    // const ticket = await Ticket.find({ relations: ["event", "user"] });

    return Ticket.findOneById(id, {
      relations: ["user", "event", "comment"]
    });
  }

  @Get("/events/:eventId/tickets")
  async allTickets() {
    const tickets = await Ticket.find({ relations: ["event", "user"] });
    return { tickets };
  }

  @Authorized()
  @Put("/tickets/:id")
  async updateTicket(@Param("id") id: number, @Body() update: Partial<Ticket>) {
    const ticket = await Ticket.findOneById(id);
    if (!ticket) throw new NotFoundError("Cannot find ticket");

    return Ticket.merge(ticket, update).save();
  }

  @Authorized()
  @Post("/events/:eventId/tickets")
  @HttpCode(201)
  async createEvent(
    @Body() ticket: Ticket,
    @CurrentUser() user: number,
    @Param("eventId") eventId: number
  ) {
    const event = await Event.findOneById(eventId);
    if (!event) throw new NotFoundError("Cannot find event");
    ticket.user = user;
    ticket.event = event;

    return ticket.save();
  }

  // @Authorized()
  // @Post("/events/:eventId/tickets/:ticketId/:userId")
  // // @Post('/tickets')
  // @HttpCode(201)
  // createTicket(
  //   @Param("eventId") eventId: number,
  //   @Param("userId") userId: number,
  //   // @Param("ticketId") ticketId: number,
  //   @Body() ticket: Ticket
  // ) {
  //   console.log(userId);
  //   ticket.event = Number(eventId);
  //   ticket.user = Number(userId);
  //   console.log(ticket);

  //   return ticket.save();
  // }
}
