import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from "typeorm";

import { MinLength, IsString, IsOptional } from "class-validator";
import User from "../users/entity";
import Ticket from "../tickets/entity";

@Entity()
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn() id?: number;

  @IsString()
  @MinLength(2)
  @Column("text", { nullable: true })
  comment: string;

  @IsOptional()
  @IsString()
  @Column("timestamp", {
    precision: 2,
    default: () => "CURRENT_TIMESTAMP",
    nullable: false
  })
  timestamp: Date;

  @ManyToOne(_ => Ticket, ticket => ticket.comment)
  ticket: Ticket;

  @ManyToOne(_ => User, user => user.comment)
  user: User;
}
