import { Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Index("tag_index", ["tag"])
export class Tag {

    @PrimaryColumn()
    tag: string;

    @Column('text', { array: true, default: [] })
    blogs: string[];
}
