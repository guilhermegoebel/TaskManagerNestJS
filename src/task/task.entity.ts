import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { User } from "../user/user.entity";
import { TaskStatus } from "./enums/task-status.enum";

@Entity()
export class Task{
    @PrimaryColumn()
    taskId: string

    @Column()
    taskName: string

    @Column()
    taskDescription: string

    @ManyToOne(() => User, user => user.tasks)
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @Column({
        type: 'enum',
        enum: TaskStatus,
        default: TaskStatus.TODO,
      })
      status: TaskStatus;
}
