import { IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    username?: string;

    @IsOptional()
    email: string;

    @IsOptional()
    passwoerd: boolean;
}