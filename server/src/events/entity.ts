import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from "typeorm";

import { MinLength, IsString } from "class-validator";

import User from "../users/entity";
import Ticket from "../tickets/entity";

@Entity()
export default class Event extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @IsString()
  @MinLength(2)
  @Column("text", { nullable: false })
  name: string;

  @IsString()
  @MinLength(2)
  @Column("text", { nullable: true })
  description: string;

  @IsString()
  @Column("text", { nullable: true })
  pictureUrl: string;

  @IsString()
  @Column("text", { nullable: true })
  startDate: string;

  @IsString()
  @Column("text", { nullable: true })
  endDate: string;

  @ManyToOne(_ => User, user => user.event)
  user: User;

  @OneToMany(_ => Ticket, ticket => ticket.event)
  ticket: Ticket;
}
