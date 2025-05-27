import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Profile {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    lastName: string;

    @Column({ type: 'int' })
    age: number;

    // * Relacion 1 a 1
    @OneToOne(() => User, user => user.profile)
    @JoinColumn({ name: 'user_id' })
    user: User;

}