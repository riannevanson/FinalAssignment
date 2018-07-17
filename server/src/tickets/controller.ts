import {
  JsonController,
  Get,
  Post,
  HttpCode,
  Param,
  Body,
  Put,
  NotFoundError,
  Authorized
} from "routing-controllers";
import Ticket from "./entity";

@JsonController()
export default class TicketController {
  @Get("/tickets/:id")
  getTicket(@Param("id") id: number) {
    return Ticket.findOneById(id);
  }

  @Get("/events/:eventId/tickets")
  async allTickets(@Param("eventId") eventId: number) {
    const tickets = await Ticket.find({
      relations: ["event"]
    });
    if (!tickets) throw new NotFoundError("Cannot find tickets for event");

    return { tickets };
  }

  // @Authorized()
  @Put("/tickets/:id")
  async updateTicket(@Param("id") id: number, @Body() update: Partial<Ticket>) {
    const ticket = await Ticket.findOneById(id);
    if (!ticket) throw new NotFoundError("Cannot find ticket");

    return Ticket.merge(ticket, update).save();
  }

  @Authorized()
  @Post("/events/:eventId/tickets/:ticketId/:userId")
  // @Post('/tickets')
  @HttpCode(201)
  createTicket(
    @Param("eventId") eventId: number,
    @Param("userId") userId: number,
    // @Param("ticketId") ticketId: number,
    @Body() ticket: Ticket
  ) {
    console.log(userId);
    ticket.event = Number(eventId);
    ticket.user = Number(userId);
    console.log(ticket);

    return ticket.save();
  }
}
