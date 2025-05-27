
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "./profile.entity";

//! AL MAPEAR UNA ENTIDAD CON TYPEORM NUNCA OLVIDAR EL DECORADOR @Entity: 
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', unique: true })
    username: string;

    @Column({ type: 'text', name: 'last_name'})
    email: string;

    @Column({ type: 'text'})
    password: string;
    
    // * Relacion 1 a 1
    @OneToOne(() => Profile, profile => profile.user, { cascade: true })
    @JoinColumn({ name: 'profile_id' })
    profile: Profile;

    @OneToMany(() => User, user => user.comments)
    comments: Comment[];
    
}