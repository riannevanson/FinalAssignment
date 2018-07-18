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
  @Get("/comments/:id")
  getComment(@Param("id") id: number) {
    return Comment.findOneById(id);
  } //returns a promise so it sais 'not found"

  @Get("/comments")
  async allComments() {
    const comments = await Comment.find();
    return { comments };
  }
}
