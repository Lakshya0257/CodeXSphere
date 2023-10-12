import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  @PrimaryGeneratedColumn('uuid')
  key: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column('text', { array: true, default: [] })
  followers_ids : string[];

  @Column('text', { array: true, default: [] })
  following_ids: string[];

  @Column('text', { array: true, default: [] })
  requests: string[];
  
  @Column()
  likes: number;

  @Column()
  about: string;
}
