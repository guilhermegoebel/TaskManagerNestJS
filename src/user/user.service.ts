import { Injectable, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.entity';
import { generateId } from 'src/app.utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }


  async createUser(userData: CreateUserDto): Promise<User> {

    const existingUser = await this.userRepository.findOne({
      where: [{ username: userData.username }, { email: userData.email }],
    });

    if (existingUser) {
      throw new ConflictException('Usuário já existe');
    }

    const user = new User();
    user.id = generateId();
    user.username = userData.username;
    user.password = await this.hashPassword(userData.password);
    user.email = userData.email;

    return this.userRepository.save(user)
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 2;
    return bcrypt.hash(password, saltRounds);
  }

  async findUserById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async updateUser(id: string, userData: UpdateUserDto): Promise<User> {
    const userToUpdate = await this.findUserById(id);
  
    if (userData.username) {
      userToUpdate.username = userData.username;
    }
    if (userData.email) {
      userToUpdate.email = userData.email;
    }
  
    const updatedUser = await this.userRepository.save(userToUpdate);
    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.delete(id)
  }
}
