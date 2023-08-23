import { Controller, Post, Body, Res, Request, Req, Put, Param, Get, Delete, UseGuards, NotFoundException, HttpException, HttpStatus, Patch } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/createTask.dto";
import { Response } from "express";
import { UserService } from "src/user/user.service";
import { User } from "src/user/user.entity";
import { Task } from "./task.entity";
import { UpdateTaskDto } from "./dto/updateTask.dto";
import { AuthGuard, Public } from "src/auth/auth.guard";

@Controller('task')
export class TaskController{
    constructor(
        private readonly taskService: TaskService,
        private readonly userService: UserService
    ){}

    @Post('/createtask')
    @UseGuards(AuthGuard)
    async createTask(@Body() taskData: CreateTaskDto, @Res() res: Response, @Request() req: any) {
        try {
            const id = req.user.sub
            const user: User = await this.userService.findUserById(id);
            const task = await this.taskService.createTask(taskData, user);
            return res.status(201).json(task);
        } catch (error) {
            throw new HttpException('Erro ao criar task', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':taskId')
    async findTaskById(@Param('taskId') taskId: string, @Res() res: Response) {
        try {
            const task: Task = await this.taskService.findTaskById(taskId);
            if (!task) {
                throw new NotFoundException('Task não encontrada');
            }
            return res.status(200).json(task);
        } catch (error) {
            throw new HttpException('Erro ao buscar task', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async getAllTasks(@Request() req: any, @Res() res: Response) {
        try {
            const id = req.user.sub;
            const tasks: Task[] = await this.taskService.findAllTasksByUserId(id);
            return res.status(200).json(tasks);
        } catch (error) {
            throw new HttpException('Erro ao buscar tasks', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch(':taskId')
    async updateTask(@Param('taskId') taskId: string, @Body() taskData: UpdateTaskDto, @Res() res: Response) {
        try {
            const updatedTask: Task = await this.taskService.updateTask(taskId, taskData);
            if (!updatedTask) {
                throw new NotFoundException('Task não encontrada', 'task_not_found');
            }
            return res.status(200).json(updatedTask);
        } catch (error) {
            throw new HttpException('Erro ao atualizar task', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':taskId/markTaskAsToDo')
    async markTaskAsToDo(@Param('taskId') taskId: string, @Res() res: Response) {
        try {
            const task: Task = await this.taskService.markTaskAsToDo(taskId)
            return res.status(200).json(task)
        } catch (error) {
            throw new HttpException('Erro ao marcar task como toDo', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':taskId/markTaskAsDoing')
    async markTaskAsDoing(@Param('taskId') taskId: string, @Res() res: Response) {
        try {
            const task: Task = await this.taskService.markTaskAsDoing(taskId)
            return res.status(200).json(task)
        } catch (error) {
            throw new HttpException('Erro ao marcar task como Doing', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put(':taskId/markTaskAsDone')
    async markTaskAsDone(@Param('taskId') taskId: string, @Res() res: Response) {
        try {
            const task: Task = await this.taskService.markTaskAsDone(taskId)
            return res.status(200).json(task)
        } catch (error) {
            throw new HttpException('Erro ao marcar task como Done', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':taskId')
    async deleteTask(@Param('taskId') taskId: string, @Res() res: Response) {
        try {
            await this.taskService.deleteTask(taskId);
            return res.status(204).send();
        } catch (error) {
            throw new HttpException('Erro ao excluir task', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}