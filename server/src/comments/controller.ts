import {
  JsonController,
  Get,
  Param
  // Body,
  // Put,
  // NotFoundError,
} from "routing-controllers";
import Comment from "./entity";
// import User from "../users/entity";
// import Ticket from "../tickets/entity";

@JsonController()
export default class CommentController {
  @Get("/events/:eventId/tickets/:ticketsId/comments/:id")
  getComment(@Param("id") id: number) {
    return Comment.findOneById(id);
  } //returns a promise so it sais 'not found"

  @Get("/events/:eventId/tickets/:ticketsId/comments")
  async allComments() {
    const comments = await Comment.find({ relations: ["ticket", "user"] });
    return { comments };
  }
}
