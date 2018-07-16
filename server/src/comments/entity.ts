import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";

import { MinLength, IsString } from "class-validator";
import User from "../users/entity";
import Ticket from "../tickets/entity";

@Entity()
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @IsString()
  @MinLength(2)
  @Column("text")
  description: string;

  @Column("int") price: number;

  @IsString()
  @Column("text", { nullable: true })
  pictureUrl: string;

  @ManyToOne(_ => Ticket, ticket => ticket.comment)
  ticket: Ticket;

  @ManyToOne(_ => User, user => user.comment)
  user: User;
}
