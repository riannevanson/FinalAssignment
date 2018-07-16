import {
  JsonController,
  Get,
  Param,
  Put,
  Body,
  NotFoundError,
  Post,
  HttpCode
} from "routing-controllers";

import Event from "./entity";

@JsonController()
export default class EventController {
  @Get("/events/:id")
  getEvent(@Param("id") id: number) {
    return Event.findOneById(id);
  }

  @Get("/events")
  async allEvents() {
    const events = await Event.find();
    return { events };
  }
  @Put("/events/:id")
  async updateEvent(@Param("id") id: number, @Body() update: Partial<Event>) {
    const event = await Event.findOneById(id);
    if (!event) throw new NotFoundError("Cannot find event");

    return Event.merge(event, update).save();
  }

  @Post("/events")
  @HttpCode(201)
  createEvent(@Body() event: Event) {
    return event.save();
  }
}
