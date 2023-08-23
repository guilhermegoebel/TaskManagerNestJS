import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { Task } from '../task/task.entity';

@Entity()
export class User {
    @PrimaryColumn()
    id: string

    @Column({unique: true})
    username: string

    @Column()
    password: string

    @Column({unique: true})
    email: string

    @OneToMany(() => Task, task => task.user)
    tasks: Task[];

}
