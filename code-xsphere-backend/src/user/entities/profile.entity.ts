import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Links } from "./links.entity";
import { Connections } from "./connections.entity";
import { Credentials } from "./creds.entity";
import { Exclude } from "class-transformer";
import { Usernames } from "src/common/entity/username.entity";
import { AbstractEntity } from "src/common/helper_entity/abstract.entity";

@Entity()
export class Profile extends AbstractEntity<Profile>{

  @PrimaryColumn('uuid')
  user_id: string;

  @OneToOne(()=>Usernames, {cascade: true ,onDelete:'CASCADE', eager: true})
  @JoinColumn({name: 'user_id',referencedColumnName:'user_id'})
  user: Usernames;

  @Column()
  description: string;

  @CreateDateColumn()
  date_created: Date;

  @OneToMany(()=>Links, (links)=>links.profile, {cascade: true})
  links: Links[];

  @OneToMany(()=>Connections , (connections)=>connections.following)
  following_to : Connections[];

  @OneToMany(()=>Connections , (connections)=>connections.followed)
  followed_by : Connections[];
}
