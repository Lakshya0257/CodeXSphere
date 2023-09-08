import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CommonBlog } from "./common/common.entity";

@Entity()
export class Blog extends CommonBlog {
  @PrimaryGeneratedColumn("uuid")
  blog_id: string;

  @Column()
  thumbnail_url: string;

  @Column()
  heading: string;

  @Column()
  body: string;

  @CreateDateColumn()
  dateCreated: Date;
}
