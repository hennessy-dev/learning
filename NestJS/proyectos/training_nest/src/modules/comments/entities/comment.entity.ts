import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from '../../categories/entities/category.entity';


@Entity()
export class Comment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    comment: string; 

    @ManyToOne(() => User, user => user.comments)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToMany(() => Category, categories => categories.comments)
    @JoinTable({ name: 'comment_category' })
    categories?: Category[];
    
}
