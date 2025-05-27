import { Comment } from "src/modules/comments/entities/comment.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false, unique: true })
    name: string; 

    @ManyToMany(() => Comment, comment => comment.categories)
    comments: Comment[];

}
