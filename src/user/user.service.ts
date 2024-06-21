import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from "bcrypt";

@Injectable()
export class UserService {
  
  constructor (@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({ ...createUserDto, password: hashedPassword });
    return await this.userRepository.save(newUser);
  }

  // async findAll(): Promise<User[]> {
  //   return await this.userRepository.find();
  // }

  async findOne(id: string): Promise<User> {
    const target: User = await this.userRepository.findOne({
      where: {
        id
      }
    });

    if (!target) throw new HttpException(null, HttpStatus.NOT_FOUND);

    return target;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const target = await this.findOne(id);
    const userUpdated = this.userRepository.merge(target, updateUserDto);
    return userUpdated;
  }

  async remove(id: string): Promise<User> {
    const target = await this.findOne(id);
    return await this.userRepository.remove(target)
  }
}
