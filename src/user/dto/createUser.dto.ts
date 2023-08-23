import { IsString, MinLength, IsEmail, MaxLength, IsNotEmpty, isNotEmpty} from "class-validator";

export class CreateUserDto{

    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8, {
		message: 'A senha deve possuir no mínimo 8 caracteres'
	})
    @MaxLength(20, {
		message: 'A senha deve possuir no máximo 20 caracteres'
	})
    password: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string
}
