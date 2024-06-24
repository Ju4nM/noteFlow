import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    
    const user: User = await this.userRepository.findOne({
      where: {
        email: createUserDto.email
      }
    });

    if (user) throw new HttpException("El correo ya se encuentra en uso", HttpStatus.CONFLICT);

    const hashedPassword = await hash(createUserDto.password, 10);
    const newUser = this.userRepository.create({ ...createUserDto, password: hashedPassword });
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(userId: string): Promise<User> {
    const target: User = await this.userRepository.findOne({
      where: {
        id: userId
      }
    });

    if (!target) throw new HttpException("Usuario no encontrado", HttpStatus.NOT_FOUND);

    return target;
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const target = await this.findOne(userId);
    
    if (updateUserDto.password) updateUserDto.password = await hash(updateUserDto.password, 10);

    const userUpdated = this.userRepository.merge(target, { ...updateUserDto });

    return await this.userRepository.save(userUpdated);
  }

  async remove(userId: string): Promise<User> {
    const target = await this.findOne(userId);
    return await this.userRepository.remove(target)
  }
}
