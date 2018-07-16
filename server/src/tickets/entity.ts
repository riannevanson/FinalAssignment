import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";
import Event from "../events/entity";

import { MinLength, IsString } from "class-validator";
import User from "../users/entity";

@Entity()
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @IsString()
  @MinLength(2)
  @Column("text")
  description: string;

  @Column("int") price: number;

  @IsString()
  @Column("text", { nullable: true })
  pictureUrl: string;

  @ManyToOne(_ => Event, event => event.ticket)
  event: Event;

  @ManyToOne(_ => User, user => user.event)
  user: User;
}
