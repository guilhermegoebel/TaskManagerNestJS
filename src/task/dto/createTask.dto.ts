import { IsString, IsNotEmpty } from "class-validator";

export class CreateTaskDto{
    @IsNotEmpty()
    @IsString()
    taskName: string

    @IsNotEmpty()
    @IsString()
    taskDescription: string
}