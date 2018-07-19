import {
  JsonController,
  Get,
  Param,
  Authorized,
  Post,
  HttpCode,
  Body,
  CurrentUser,
  NotFoundError
  // Body,
  // Put,
  // NotFoundError,
} from "routing-controllers";
import Comment from "./entity";
import User from "../users/entity";
import Ticket from "../tickets/entity";

@JsonController()
export default class CommentController {
  @Get("/tickets/:ticketId/comments/:id")
  getComment(@Param("id") id: number) {
    return Comment.findOneById(id);
  } //returns a promise so it sais 'not found"

  @Get("/tickets/:ticketId/comments")
  async allComments(@Param("ticketId") ticketId: number) {
    const comments = await Comment.find({ relations: ["ticket", "user"] });
    return { comments };
  }

  @Authorized()
  @Post("/tickets/:ticketId/comments")
  @HttpCode(201)
  async createComment(
    @Body() comment: Comment,
    @CurrentUser() user: User,
    @Param("ticketId") ticketId: number
  ) {
    const ticket = await Ticket.findOneById(ticketId);
    if (!ticket) throw new NotFoundError("Cannot find ticket");
    comment.user = user;
    comment.ticket = ticket;

    return comment.save();
  }
}
