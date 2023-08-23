import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
    @IsOptional()
    @IsNotEmpty()
    taskName?: string;

    @IsOptional()
    taskDescription?: string;
}