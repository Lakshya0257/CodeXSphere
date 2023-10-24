import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Media } from "./media.entity";
import { Blog } from "src/blogs/entities/blog.entity";
import { BlogLikes } from "src/blogs/entities/likes.entity";
import { Comments } from "src/blogs/entities/comments.entity";
import { Credentials } from "src/user/entities/creds.entity";
import { AbstractEntity } from "../helper_entity/abstract.entity";

@Entity()
@Unique(['user_id'])
export class Usernames extends AbstractEntity<Usernames>{

    @PrimaryColumn('uuid')
    user_id: string;

    @OneToOne(()=>Credentials, (creds)=>creds.user, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'user_id', referencedColumnName: 'user_id'})
    credentials: Credentials

    @Column()
    username: string;

    @OneToOne(()=>Media, (media)=>media.user, {cascade : true},)
    avatar: Media;

    @OneToMany(()=>Blog,(blog)=> blog.creator,)
    blogs: Blog[];
    
    @OneToMany(()=>BlogLikes, (blogLikes)=>blogLikes.user)
    liked_blogs: BlogLikes[];

    @OneToMany(()=>Comments, (comment)=>comment.user)
    comments: Comments[];
    
    @OneToMany(()=>BlogLikes,(like)=>like.liked_to)
    likes: BlogLikes[];
}