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
  @Get("/api/tickets/:id")
  getTicket(@Param("id") id: number) {
    return Ticket.findOneById(id);
  }

  @Get("/api/tickets")
  async allTickets() {
    const tickets = await Ticket.find();
    return { tickets };
  }

  // @Authorized()
  @Put("/api/tickets/:id")
  async updateTicket(@Param("id") id: number, @Body() update: Partial<Ticket>) {
    const ticket = await Ticket.findOneById(id);
    if (!ticket) throw new NotFoundError("Cannot find ticket");

    return Ticket.merge(ticket, update).save();
  }

  @Authorized()
  @Post("/api/events/:eventId/tickets/:userId")
  // @Post('/api/tickets')
  @HttpCode(201)
  createTicket(
    @Param("eventId") eventId: number,
    @Param("userId") userId: number,
    @Body() ticket: Ticket
  ) {
    console.log(userId);
    ticket.event = Number(eventId);
    ticket.user = Number(userId);
    console.log(ticket);

    return ticket.save();
  }
}
