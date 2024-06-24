import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/core/decorators/common.decorator';
import { Request } from 'express';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }
  
  @Public()
  @Get("all")
  async findAll () {
    return await this.userService.findAll();
  }

  @Get()
  async findOne(@Req() req: Request): Promise<User> {
    const { userId } = req.user as any;
    return await this.userService.findOne(userId);
  }


  @Put()
  async update(@Body() updateUserDto: UpdateUserDto, @Req() req: Request): Promise<User> {
    const { userId } = req.user as any;
    return await this.userService.update(userId, updateUserDto);
  }

  @Delete()
  async remove(@Req() req: Request): Promise<User> {
    const { userId } = req.user as any;
    return await this.userService.remove(userId);
  }
}
