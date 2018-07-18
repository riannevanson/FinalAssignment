import {
  JsonController,
  Get,
  Param,
  Put,
  Body,
  NotFoundError,
  Post,
  HttpCode,
  Authorized,
  CurrentUser
} from "routing-controllers";

import Event from "./entity";
import User from "../users/entity";

@JsonController()
export default class EventController {
  @Get("/events/:id")
  getEvent(@Param("id") id: number) {
    return Event.findOneById(id);
  }

  @Get("/events/skip/:skip")
  async nineEvents(@Param("skip") skip: number) {
    const events = await Event.find({
      order: {
        id: "ASC"
      },
      skip: skip,
      take: 9
    });
    return { events };
  }

  @Get("/events")
  async allEvents() {
    const events = await Event.find({
      order: {
        id: "ASC"
      }
    });
    return { events };
  }

  @Authorized()
  @Put("/events/:id")
  async updateEvent(@Param("id") id: number, @Body() update: Partial<Event>) {
    const event = await Event.findOneById(id);
    if (!event) throw new NotFoundError("Cannot find event");

    return Event.merge(event, update).save();
  }

  @Authorized()
  @Post("/events")
  @HttpCode(201)
  async createEvent(@Body() event: Event, @CurrentUser() user: User) {
    event.user = user;
    return await event.save();
  }

  //   @Post("/events")
  //   @HttpCode(201)

  //   async createGame(@CurrentUser() user: User) {
  //     const entity = await Event.create().save();

  //     const event = await Event.findOneById(entity.id);
  //     if (!event) throw new NotFoundError("Cannot find event");

  //     return event.save();
}
