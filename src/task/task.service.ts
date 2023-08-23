import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/createTask.dto';
import { generateId } from 'src/app.utils';
import { User } from 'src/user/user.entity';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { TaskStatus } from './enums/task-status.enum';

@Injectable()
export class TaskService{
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) {}

    async createTask (taskData: CreateTaskDto, user: User): Promise<Task>{
        const task = new Task()
        task.taskName = taskData.taskName
        task.taskDescription = taskData.taskDescription
        task.taskId = generateId()
        task.user = user

        const createdTask: Task = await this.taskRepository.save(task)
        return createdTask
    }

    async findTaskById(taskId: string): Promise<Task> {
        const task: Task = await this.taskRepository.findOne({ where: { taskId } });
        return task
      }
    
    async markTaskAsToDo(taskId: string): Promise<Task> {
        const task: Task = await this.findTaskById(taskId)
        task.status = TaskStatus.TODO
        await this.taskRepository.save(task)
        return task
      }
    
    async markTaskAsDoing(taskId: string): Promise<Task> {
        const task: Task = await this.findTaskById(taskId)
        task.status = TaskStatus.DOING
        await this.taskRepository.save(task)
        return task
      }
    
    async markTaskAsDone(taskId: string): Promise<Task> {
        const task: Task = await this.findTaskById(taskId)
        task.status = TaskStatus.DONE
        await this.taskRepository.save(task)
        return task
      }
    

    async findAllTasksByUserId (id: string): Promise<Task[]>{
        const tasks: Task[] = await this.taskRepository.find({where: {user: {id: id}}})
        return tasks
    }

    async updateTask(taskId: string, taskData: UpdateTaskDto): Promise<Task | null> {
        const task = await this.findTaskById(taskId);

        if (taskData.taskName) {
            task.taskName = taskData.taskName;
        }

        if (taskData.taskDescription) {
            task.taskDescription = taskData.taskDescription;
        }

        await this.taskRepository.save(task);
        return task;
    }

    async deleteTask (taskId: string): Promise<void>{
        await this.taskRepository.delete(taskId)
    }
}
