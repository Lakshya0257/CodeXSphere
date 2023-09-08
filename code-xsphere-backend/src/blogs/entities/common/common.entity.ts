import { Column} from "typeorm";

export abstract class CommonBlog{

    @Column()
    user_id: string;

    @Column('text', { array: true, default: [] })
    likes: string[];

}