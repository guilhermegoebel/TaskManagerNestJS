import { Controller, Post, Body, Res, Get, Param, Delete, Patch, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';
import { Response } from 'express';
import { Public } from 'src/auth/auth.guard';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Public()
  @Post('/register')
  async createUser(@Body() userData: CreateUserDto, @Res() res: Response) {
    try {
      const createdUser: User = await this.userService.createUser(userData)
      const response = {
        message: 'Usuário criado com sucesso',
        user: createdUser,
      }
      res.status(201).json(response);
    } catch (error) {
      throw new HttpException('Erro ao criar usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Get(':id')
  async findUserById(@Param('id') id: string, @Res() res: Response) {
    try {
      const user: User = await this.userService.findUserById(id);
      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }
      res.status(200).json(user);
      
    } catch (error) {
      throw new HttpException('Erro ao buscar usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':username/getByUsername')
  async findUserByUsername(@Param('username') username: string, @Res() res: Response) {
    try {
      const user: User = await this.userService.findUserByUsername(username);
      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }
      res.status(200).json(user);
      
    } catch (error) {
      throw new HttpException('Erro ao buscar usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  async findAllUsers(@Res() res: Response) {
    try {
      const users: User[] = await this.userService.findAllUsers();
      res.status(200).json(users);
    } catch (error) {
      throw new HttpException('Erro ao buscar usuários', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() userData: UpdateUserDto, @Res() res: Response) {
    try {
      const updatedUser: User = await this.userService.updateUser(id, userData);
      res.status(200).json(updatedUser);
    } catch (error) {
      throw new HttpException('Erro ao atualizar usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.userService.deleteUser(id);
      res.status(204).send();
    } catch (error) {
      throw new HttpException('Erro ao excluir usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}